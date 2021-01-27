/**
 * Copyright 2017, IOOF Holdings Limited.
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

export enum SubspaceType {
    ROOT,
    NAMESPACE_ROOT,
    CHILD
}

export interface ProcessActionCallback<TReturn> {
    (action: Redux.Action): TReturn;
}

export interface ProcessAction {
    (action: Redux.Action, callback: ProcessActionCallback<void>): undefined;
    <TReturn>(action: Redux.Action, callback: ProcessActionCallback<TReturn>, defaultValue: TReturn): TReturn;
}

export interface SubspaceOptions {
    enhancer: Redux.StoreEnhancer
}

export interface StoreWithParent<TState, TParentState> extends Redux.Store<TState> {
    parentStore: Redux.Store<TParentState>;
}

export interface Subspace<TState, TRootState = any, TParentState = any> extends StoreWithParent<TState, TParentState> {
    rootStore: Redux.Store<TRootState>;
    namespace: string;
    subspaceTypes: SubspaceType[];
    processAction: ProcessAction;
    subspaceOptions: SubspaceOptions;
}

export interface StoreDecorator<TParentState, TState, TStore extends Redux.Store<TState>> {
    (store: Redux.Store<TParentState>): TStore;
}

export interface SubspaceCreator {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): StoreDecorator<TParentState, TSubState, Subspace<TSubState, any, TParentState>>;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState, Subspace<TSubState, any, TParentState>>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): StoreDecorator<TParentState, TSubState, Subspace<TSubState, TRootState, TParentState>>;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): StoreDecorator<TParentState, TSubState, Subspace<TSubState, TRootState, TParentState>>;
    <TParentState, TSubStateKey extends keyof TParentState>(namespace: keyof TParentState): StoreDecorator<TParentState, TParentState[TSubStateKey], Subspace<TParentState[TSubStateKey], any, TParentState>>;
    <TParentState, TSubStateKey extends keyof TParentState>(mapState: keyof TParentState, namespace: string): StoreDecorator<TParentState, TParentState[TSubStateKey], Subspace<TParentState[TSubStateKey], any, TParentState>>;
}

export const subspace: SubspaceCreator;

export function parentSpace<TParentState>(store: StoreWithParent<any, TParentState> | Redux.Store<any>): Redux.Store<TParentState>;

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

export type GetState<TState> = () => TState;

export interface GetStateMiddleware<TState> {
    (next: GetState<TState>): GetState<any>;
}

export interface DispatchMiddleware<TState> {
    (next: Redux.Dispatch): Redux.Dispatch;
}

export interface SubspaceMiddlewareAPI<TState, TRootState> {
    getState: GetState<TState>;
    dispatch: Redux.Dispatch;
    rootStore: Redux.Store<TRootState>;
    namespace: string;
    subspaceTypes: SubspaceType[];
    processAction: ProcessAction;
    subspaceOptions: SubspaceOptions;
}

export interface SubspaceMiddleware {
    <TState>(subspace: SubspaceMiddlewareAPI<TState, any>): ({ getState?: GetStateMiddleware<TState>, dispatch?: DispatchMiddleware<TState> });
}

export function applyMiddleware(...middlewares: (SubspaceMiddleware | Redux.Middleware)[]): Redux.StoreEnhancer;

export function applyToRoot(middleware: SubspaceMiddleware | Redux.Middleware): SubspaceMiddleware;

export function applyToNamespaceRoots(middleware: SubspaceMiddleware | Redux.Middleware): SubspaceMiddleware;

export function applyToChildren(middleware: SubspaceMiddleware | Redux.Middleware): SubspaceMiddleware;

export function globalActions(...actionTypes: (string | RegExp)[]): SubspaceMiddleware;

/**
 * Actions
 */
export interface ActionDecorator {
    <TAction extends Redux.Action>(action: TAction): TAction;
}

export const globalAction: ActionDecorator;

export function namespacedAction(namespace: string): ActionDecorator;
