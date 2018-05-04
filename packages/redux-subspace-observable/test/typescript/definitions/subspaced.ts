/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionsObservable, Epic, combineEpics, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import { subspaced } from '../../../src'

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

const subStateEpic = subspaced<ParentState, ChildState>((state) => state.child)(epic)
const namespacedEpic = subspaced('test')(epic)
const subspacedEpic = subspaced<ParentState, ChildState>((state) => state.child, 'test')(epic)
const subStateEpicWithRoot = subspaced<ParentState, RootState, ParentState>((state, rootState) => rootState.parent)(epic)
const subspacedEpicWithRoot = subspaced<ParentState, RootState, ParentState>((state, rootState) => rootState.parent, "test")(epic)

const rootEpic = combineEpics(
    subStateEpic,
    namespacedEpic,
    subspacedEpic,
    subStateEpicWithRoot,
    subspacedEpicWithRoot
)
