/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { take, put } from 'redux-saga/effects'
import { provideStore } from '../../../src'

const reducer = (state = {}) => state

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

function* saga() {
  yield take("TEST")
  yield put({ type: "USE_TEST" })
}

const sagaWithStore = provideStore(store)(saga)

sagaMiddleware.run(sagaWithStore)
