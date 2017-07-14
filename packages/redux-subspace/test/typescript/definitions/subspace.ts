/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers, Reducer, Store } from 'redux'
import { subspace } from '../../../src'

interface ChildState {
}

interface ParentState {
    child: ChildState
}

interface RootState {
    parent: ParentState
}

const childReducer = (state) => state

const parentReducer = combineReducers<ParentState>({ child: childReducer })

const rootReducer = combineReducers<RootState>({ parent: parentReducer })

const store = createStore(rootReducer)

const subspacedStore: Store<ChildState> = subspace(store, (state) => state.parent)
const namespacedStore: Store<ChildState> = subspace(store, (state) => state.parent, "parent")

const subspacedStoreWithRoot: Store<ParentState> = subspace<ChildState, RootState, ParentState>(subspacedStore, (state, rootState) => rootState.parent)
const namespacedStoreWithRoot: Store<ParentState> = subspace<ChildState, RootState, ParentState>(subspacedStore, (state, rootState) => rootState.parent, "root")