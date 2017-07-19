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

export interface Subspace<TState, TRootState> extends Redux.Store<TState> {
    rootStore: Redux.Store<TRootState>;
    namespace: string;
}

export interface StoreDecorator<TParentState, TState, TStore extends Redux.Store<TState>> {
    (store: Redux.Store<TParentState>): TStore;
}

export interface SubspaceCreator {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): StoreDecorator<TParentState, TSubState, Substate<TParentState, any, TSubState>>;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState, Substate<TParentState, any, TSubState>>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): StoreDecorator<TParentState, TSubState, Substate<TParentState, TRootState, TSubState>>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState, Substate<TParentState, TRootState, TSubState>>;;
    (namespace: string): StoreDecorator<any, any, any>;
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

export const namespaced: (namespace: string) => ReducerDecorator;

/**
 * Middleware
 */
export type GetState<TState> = () => TState;

export interface GetStateMiddleware {
    <TState>(subspace: Subspace<TState, any>): (next: GetState<TState>) => GetState<TState>;
    <TState, TNewState>(subspace: Subspace<TState, any>): (next: GetState<TState>) => GetState<TNewState>;
}

export interface DispatchMiddleware {
    <TState>(subspace: Subspace<TState, any>): (next: Redux.Dispatch<TState>) => Redux.Dispatch<TState>;
}

export interface SubspaceMiddleware {
    getState?: GetStateMiddleware[];
    dispatch?: DispatchMiddleware[];
}

export const applyMiddleware = (...middlewares: (SubspaceMiddleware | DispatchMiddleware)[]) => Redux.GenericStoreEnhancer;

export const globalActions: (...actionTypes: string[]) => SubspaceMiddleware;

/**
 * Actions
 */
export interface ActionDecorator {
    <TAction extends Redux.Action>(action: TAction): TAction;
}

export const globalAction: ActionDecorator;

export const namespacedAction: (namespace: string) => ActionDecorator;
