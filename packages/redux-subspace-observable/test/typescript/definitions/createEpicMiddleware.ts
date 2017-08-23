/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware, Action } from 'redux'
import { Epic, ActionsObservable } from 'redux-observable'
import { takeEvery, put } from 'redux-saga/effects'
import 'rxjs/add/operator/map'
import { createEpicMiddleware } from '../../../src'

const reducer = (state = {}) => state

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class RootState {
    parent: ParentState
}

const epic: Epic<any, any> = (action$: ActionsObservable<any>) => action$
    .ofType('PING')
    .map(action => ({ type: 'PONG' }))

const epicMiddleware = createEpicMiddleware(epic)

const store = createStore(reducer, applyMiddleware(epicMiddleware))
