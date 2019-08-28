/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers, Store, Reducer } from 'redux'
import { parentSpace, subspace } from '../../../src'

interface ChildState {
    value: string
}

interface ParentState {
    child: ChildState
}

interface RootState {
    parent: ParentState
}

const childReducer: Reducer<ChildState> = (state) => state

const parentReducer = combineReducers<ParentState>({ child: childReducer })

const rootReducer = combineReducers<RootState>({ parent: parentReducer })

const rootStore = createStore(rootReducer)

const parentStore = subspace<RootState, ParentState>((state) => state.parent)(rootStore)

const childStore = subspace<ParentState, ChildState>((state) => state.child)(parentStore)

const fallbackStore: Store<RootState> = parentSpace(rootStore)

const parentOrParentStore: Store<RootState> = parentSpace(parentStore)

const parentOdChildStore: Store<ParentState> = parentSpace(childStore)
