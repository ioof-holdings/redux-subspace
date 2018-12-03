/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { ActionsObservable, Epic, ofType } from 'redux-observable'
import { applyMiddleware } from 'redux-subspace'
import { map } from 'rxjs/operators'
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

const epic: Epic<any, any> = (action$: ActionsObservable<any>) => action$.pipe(
    ofType('PING'),
    map(action => ({ type: 'PONG' })))

const epicMiddleware = createEpicMiddleware()

const store = createStore(reducer, applyMiddleware(epicMiddleware))

epicMiddleware.run(epic)
