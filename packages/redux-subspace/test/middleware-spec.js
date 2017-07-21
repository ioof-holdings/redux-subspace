/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { subspace, applyMiddleware, namespaced } from '../src'

describe('middleware integration tests', () => {

    const TEST_ACTION = 'TEST_ACTION'

    const testAction = (value) => ({ type: TEST_ACTION, value })

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    describe('redux-thunk', () => {

        const checkingThunk = (store, action) => (dispatch, getState) => {
            expect(getState()).to.deep.equal(store.getState())
            dispatch(action)
        }

        it('should work with no subspaces', () => {
            const rootStore = createStore(rootReducer, applyMiddleware(thunk))

            rootStore.dispatch(checkingThunk(rootStore, testAction('root value')))

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
            const rootStore = createStore(rootReducer, applyMiddleware(thunk))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            rootStore.dispatch(checkingThunk(rootStore, testAction('root value')))

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

            parentStore.dispatch(checkingThunk(parentStore, testAction('parent value')))

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
            const rootStore = createStore(rootReducer, applyMiddleware(thunk))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            rootStore.dispatch(checkingThunk(rootStore, testAction('root value')))

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

            parentStore.dispatch(checkingThunk(parentStore, testAction('parent value')))

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

            childStore.dispatch(checkingThunk(childStore, testAction('child value')))

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
            const rootStore = createStore(rootReducer, applyMiddleware(thunk))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            rootStore.dispatch(checkingThunk(rootStore, testAction('root value')))

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

            parentStore.dispatch(checkingThunk(parentStore, testAction('parent value')))

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
            const rootStore = createStore(rootReducer, applyMiddleware(thunk))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            rootStore.dispatch(checkingThunk(rootStore, testAction('root value')))

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

            parentStore.dispatch(checkingThunk(parentStore, testAction('parent value')))

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

            childStore.dispatch(checkingThunk(childStore, testAction('child value')))

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
})
