/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { Cmd, loop, install, combineReducers } from 'redux-loop'
import { namespaced } from '../src'
import { subspace } from 'redux-subspace'

describe('integration tests', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'
    const TEST_ACTION = 'TEST_ACTION'

    const childReducer = (state = 'initial value', action) => {
        switch (action.type) {
            case TEST_ACTION:
                return action.value
            case TEST_ACTION_TRIGGER:
                return loop(state, Cmd.action({type: TEST_ACTION, value: action.value}))
            default:
                return state
        }
    }
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })


    it('should work with no namespace single subspace', async () => {
        const rootStore = createStore(rootReducer, install())

        const parentStore = subspace((state) => state.parent1)(rootStore)

        await rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

       await parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'parent value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })
    })

    it('should work with no namespace nested subspaces', async () => {
        const rootStore = createStore(rootReducer, install())

        const parentStore = subspace((state) => state.parent1)(rootStore)

        const childStore = subspace((state) => state.child1)(parentStore)

        await rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        await parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'parent value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        await childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'child value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })
    })

    it('should work with namespaced single subspace', async () => {
        const rootStore = createStore(rootReducer, install())

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        await rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        await parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'initial value'
            }
        })
    })

    it('should work with namespaced nested subspace', async () => {
        const rootStore = createStore(rootReducer, install())

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)
        const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

        await rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        await parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'initial value'
            }
        })

        await childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'child value'
            }
        })
    })
})
