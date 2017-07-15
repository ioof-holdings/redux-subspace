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
    value: string
}

interface ParentState {
    child: ChildState
}

interface RootState {
    parent: ParentState
}

interface CustomState extends ChildState {
    parent: ParentState
}

const childReducer = (state) => state

const parentReducer = combineReducers<ParentState>({ child: childReducer })

const rootReducer = combineReducers<RootState>({ parent: parentReducer })

const store = createStore(rootReducer)

const subspacedStore: Store<ParentState> = subspace<RootState, ParentState>(store, (state) => state.parent)
const namespacedStore: Store<ParentState> = subspace<RootState, ParentState>(store, (state) => state.parent, "parent")

const subspacedStoreWithRoot: Store<ParentState>  = subspace<ParentState, RootState, ParentState>(subspacedStore, (state, rootState) => rootState.parent)
const namespacedStoreWithRoot: Store<ParentState>  = subspace<ParentState, RootState, ParentState>(subspacedStore, (state, rootState) => rootState.parent, "root")

const subspacedStoreWithCombinedState: Store<CustomState>  = subspace<ParentState, RootState, CustomState>(subspacedStore, (state, rootState) => ({ ...state.child, parent: rootState.parent }))
const namespacedStoreWithCombinedState: Store<CustomState>  = subspace<ParentState, RootState, CustomState>(subspacedStore, (state, rootState) => ({ ...state.child, parent: rootState.parent }), "root")