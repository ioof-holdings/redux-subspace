/**
 * Copyright 2016, IOOF Holdings Limited.
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

const subspacedSaga = subspaced<typeof saga, ParentState, RootState, ChildState>(saga, (state) => state.child)
const namespacedSaga = subspaced<typeof saga, ParentState, RootState, ChildState>(saga, (state) => state.child, 'test')
const subspacedSagaWithRoot = subspaced<typeof saga, ParentState, RootState, ParentState>(saga, (state, rootState) => rootState.parent)
const namespacedSagaWithRoot = subspaced<typeof saga, ParentState, RootState, ParentState>(saga, (state, rootState) => rootState.parent, "test")

sagaMiddleware.run(subspacedSaga)
sagaMiddleware.run(namespacedSaga)
sagaMiddleware.run(subspacedSagaWithRoot)
sagaMiddleware.run(namespacedSagaWithRoot)