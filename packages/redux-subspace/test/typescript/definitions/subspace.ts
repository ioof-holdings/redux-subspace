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

const subStore: Store<ParentState> = subspace<RootState, ParentState>((state) => state.parent)(store)
const namespacedStore: Store<ParentState> = subspace("parent")(store)
const subspacedStore: Store<ParentState> = subspace<RootState, ParentState>((state) => state.parent, "parent")(store)

const subStoreWithRoot: Store<ParentState>  = subspace<ParentState, RootState, ParentState>((state, rootState) => rootState.parent)(subspacedStore)
const subspacedStoreWithRoot: Store<ParentState>  = subspace<ParentState, RootState, ParentState>((state, rootState) => rootState.parent, "parent")(subspacedStore)

const subStoreWithCombinedState: Store<CustomState>  = subspace<ParentState, RootState, CustomState>((state, rootState) => ({ ...state.child, parent: rootState.parent }))(subspacedStore)
const subspacedStoreWithCombinedState: Store<CustomState>  = subspace<ParentState, RootState, CustomState>((state, rootState) => ({ ...state.child, parent: rootState.parent }), "custom")(subspacedStore)
