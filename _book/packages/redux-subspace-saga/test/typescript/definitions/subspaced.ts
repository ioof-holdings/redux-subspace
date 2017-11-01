/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import { subspaced } from '../../../src'

const reducer = (state = {}) => state

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class RootState {
    parent: ParentState
}

function* useTest() {
  yield put({ type: "USE_TEST" })
}

function* saga() {
  yield takeEvery("TEST", useTest)
}

const subStateSaga = subspaced<ParentState, ChildState>((state) => state.child)(saga)
const namespacedSaga = subspaced('test')(saga)
const subspacedSaga = subspaced<ParentState, ChildState>((state) => state.child, 'test')(saga)
const subStateSagaWithRoot = subspaced<ParentState, RootState, ParentState>((state, rootState) => rootState.parent)(saga)
const subspacedSagaWithRoot = subspaced<ParentState, RootState, ParentState>((state, rootState) => rootState.parent, "test")(saga)

sagaMiddleware.run(subStateSaga)
sagaMiddleware.run(namespacedSaga)
sagaMiddleware.run(subspacedSaga)
sagaMiddleware.run(subStateSagaWithRoot)
sagaMiddleware.run(subspacedSagaWithRoot)
