/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import { subspace, applyMiddleware, namespaced } from 'redux-subspace'
import { combineEpics } from 'redux-observable'
import { map } from 'rxjs/operator/map'
import { createEpicMiddleware, subspaced } from '../src'

describe('integration tests', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'

    const TEST_ACTION = 'TEST_ACTION'

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const checkingEpic = (action$) => action$.ofType(TEST_ACTION_TRIGGER)
        ::map(action => ({ type: TEST_ACTION, value: action.value }))

    it('should not throw error when dependencies is undefined/null/an object', () => {
        expect(() => {
            createEpicMiddleware(checkingEpic)
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, {})
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: undefined })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: null })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: { foo: 'bar' } })
        }).not.to.throw(TypeError, 'dependencies must be an object')
    })

    it('should throw error when dependencies is not an object', () => {
        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: true })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: 5 })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: 'foo' })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: ['foo', 'bar'] })
        }).to.throw(TypeError, 'dependencies must be an object')
    })

    it('should work with no subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

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
    })

    it('should work with no namespace single subspace', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

        const parentStore = subspace((state) => state.parent1)(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

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

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

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

    it('should work with no namespace nested subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

        const parentStore = subspace((state) => state.parent1)(rootStore)

        const childStore = subspace((state) => state.child1)(parentStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

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

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

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

        childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

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

    it('should work with namespaced single subspace', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(
            combineEpics(
                checkingEpic,
                subspaced((state) => state.parent2, 'parentNamespace')(checkingEpic)
            )
        )))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

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

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })
        
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

    it('should work with namespaced nested subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(
            combineEpics(
                checkingEpic,
                subspaced((state) => state.parent2, 'parentNamespace')(
                    combineEpics(
                        checkingEpic,
                        subspaced((state) => state.child2, 'childNamespace')(checkingEpic)
                    )
                )
            )
        )))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

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

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

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

        childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

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
