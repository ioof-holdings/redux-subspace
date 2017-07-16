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

export interface StoreDecorator<TParentState, TRootState, TSubState> {
    (store: Redux.Store<TParentState>): Subspace<TSubState, TRootState>;
}

export interface SubspaceCreator {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): StoreDecorator<TParentState, any, TSubState>;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): StoreDecorator<TParentState, any, TSubState>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): StoreDecorator<TParentState, TRootState, TSubState>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): StoreDecorator<TParentState, TRootState, TSubState>;
    (namespace: string): StoreDecorator<any, any, any>;
}

export const subspace: SubspaceCreator;

export interface SubspaceEnhancerSubspaceCreator {
    (store: Redux.Store<any>, mapState: MapState<any, any, any>, namespace, string): Subspace<any, any>
}

export interface SubspaceEnhancer {
    (next: SubspaceEnhancerSubspaceCreator): SubspaceEnhancerSubspaceCreator;
}

export interface ConfigureSubspaces {
    (...enhancers: SubspaceEnhancer[]): Redux.GenericStoreEnhancer;
}

export const configureSubspaces: ConfigureSubspaces

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
 * Middleware
 */

export type GetState<TState> = () => TState

export interface GetStateMiddleware {
    <TState>(subspace: Subspace<TState, any>): (next: GetState<TState>) => GetState<TState>
    <TState, TRootState>(subspace: Subspace<TState, TRootState>): (next: GetState<TState>) => GetState<TState>
}

export interface ApplyGetStateMiddleware {
    (...middlewares: GetStateMiddleware[]): SubspaceEnhancer
}

export const applyGetStateMiddleware: ApplyGetStateMiddleware

export interface DispatchMiddleware {
    <TState>(subspace: Subspace<TState, any>): (next: Redux.Dispatch<TState>) => Redux.Dispatch<TState>
    <TState, TRootState>(subspace: Subspace<TState, TRootState>): (next: Redux.Dispatch<TState>) => Redux.Dispatch<TState>
}

export interface ApplyDispatchMiddleware {
    (...middlewares: DispatchMiddleware[]): SubspaceEnhancer
}

export const applyDispatchMiddleware: ApplyDispatchMiddleware

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
