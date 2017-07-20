/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import { subspace, applyMiddleware, namespaced, rootOnly } from 'redux-subspace'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, select, put, all } from 'redux-saga/effects'
import { provideStore, subspaced } from '../src'

describe('integration tests', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'

    const TEST_ACTION = 'TEST_ACTION'

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const checkingSaga = (store) => {
        function* makeTestAction(action) {
            const state = yield select((state) => state)
            expect(state).to.deep.equal(store.getState())
            yield put({ type: TEST_ACTION, value: action.value })
        }

        return function* watchTestAction() {
            yield takeEvery(TEST_ACTION_TRIGGER, makeTestAction)
        }
    }

    it('should work with no subspaces', () => {
        const sagaMiddleware = createSagaMiddleware()

        const rootStore = createStore(rootReducer, applyMiddleware(sagaMiddleware))

        sagaMiddleware.run(checkingSaga(rootStore))

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
        const sagaMiddleware = createSagaMiddleware()

        const rootStore = createStore(rootReducer, applyMiddleware(rootOnly(sagaMiddleware)))

        sagaMiddleware.run(checkingSaga(rootStore))

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
        const sagaMiddleware = createSagaMiddleware()

        const rootStore = createStore(rootReducer, applyMiddleware(rootOnly(sagaMiddleware)))

        sagaMiddleware.run(checkingSaga(rootStore))

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
        const sagaMiddleware = createSagaMiddleware()

        const rootStore = createStore(rootReducer, applyMiddleware(rootOnly(sagaMiddleware)))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        function* rootSaga() {
            yield all([
                checkingSaga(rootStore)(),
                subspaced((state) => state.parent2, 'parentNamespace')(checkingSaga(parentStore))()
            ])
        }

        sagaMiddleware.run(provideStore(rootStore)(rootSaga))

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

    it('should work with namespaced nested subspace', () => {
        const sagaMiddleware = createSagaMiddleware()

        const rootStore = createStore(rootReducer, applyMiddleware(rootOnly(sagaMiddleware)))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

        function* parentSaga() {
            yield all([
                checkingSaga(parentStore)(),
                subspaced((state) => state.child2, 'childNamespace')(checkingSaga(childStore))()
            ])
        }

        function* rootSaga() {
            yield all([
                checkingSaga(rootStore)(),
                subspaced((state) => state.parent2, 'parentNamespace')(parentSaga)()
            ])
        }

        sagaMiddleware.run(provideStore(rootStore)(rootSaga))

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
