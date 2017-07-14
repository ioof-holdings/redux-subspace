/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Redux from 'redux';

/**
 * Store
 */
export interface MapState<TParentState, TRootState, TSubState>{
    (state: TParentState, rootState?: TRootState): TSubState;
}

export interface SubspaceCreator {
    <TParentState, TRootState, TSubState>(store: Redux.Store<TParentState>, mapState: MapState<TParentState, TRootState, TSubState>,namespace?: string): Redux.Store<TSubState>;
}

export const subspace: SubspaceCreator

/**
 * Reducers
 */
export function namespaced<S>(state: Redux.Reducer<S>, namespace: string): Redux.Reducer<S>;

/**
 * Actions
 */
interface GlobalActionsRegister {
    register(type: string): GlobalActionsRegister;
    isGlobal(action: Redux.Action): boolean;
}

export function asGlobal(action: Redux.Action): Redux.Action;

export const GlobalActions: GlobalActionsRegister;

