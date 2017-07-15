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

export interface StoreDecorator<TState, TSubState> {
    (store: Redux.Store<TState>): Redux.Store<TSubState>;
}

export interface SubspaceCreator {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): StoreDecorator<TParentState, TSubState>;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): StoreDecorator<TParentState, TSubState>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState>;
    (namespace: string): StoreDecorator<any, any>;
}

export const subspace: SubspaceCreator;

/**
 * Reducers
 */
export interface ReducerDecorator {
    <TState>(reducer: Redux.Reducer<TState>): Redux.Reducer<TState>;
}

export interface Namespaced {
    (namespace: string): ReducerDecorator;
}

export const namespaced: Namespaced;

/**
 * Actions
 */
interface GlobalActionsRegister {
    register(type: string): GlobalActionsRegister;
    isGlobal(action: Redux.Action): boolean;
}

export interface ActionDecorator {
    <TAction extends Redux.Action>(action: TAction): TAction;
}

export const asGlobal: ActionDecorator;

export const GlobalActions: GlobalActionsRegister;
