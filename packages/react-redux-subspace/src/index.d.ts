/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux'
import { Subspace, MapState } from 'redux-subspace'

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

type ReactReduxContext = React.Context<ReactRedux.ReactReduxContextValue>

export type ContextOverride = ReactReduxContext | { parent? : ReactReduxContext, child? : ReactReduxContext }

export interface UseSubspaceOptions {
    context?: ReactReduxContext
}

export interface UseSubspace {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, options?: UseSubspaceOptions): Subspace<TSubState, any, TParentState>
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string, options?: UseSubspaceOptions): Subspace<TSubState, any, TParentState>
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, options?: UseSubspaceOptions): Subspace<TSubState, TRootState, TParentState>
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string, options?: UseSubspaceOptions): Subspace<TSubState, TRootState, TParentState>
    (namespace: string, options?: UseSubspaceOptions): Subspace<any, any, any>;
    (mapState: string, namespace: string, options?: UseSubspaceOptions): Subspace<any, any, any>;
}

export const useSubspace: UseSubspace;

export interface SubspaceOptions {
    context?: ContextOverride
}

export interface Subspaced {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, options?: SubspaceOptions): ComponentDecorator;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string, options?: SubspaceOptions): ComponentDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, options?: SubspaceOptions): ComponentDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string, options?: SubspaceOptions): ComponentDecorator;
    (namespace: string, options?: SubspaceOptions): ComponentDecorator;
    (mapState: string, namespace: string, options?: SubspaceOptions): ComponentDecorator;
}

export const subspaced: Subspaced;

export interface SubspaceProviderProps<TParentState, TRootState, TSubState> {
    mapState?: MapState<TParentState, TRootState, TSubState> | string;
    namespace?: string;
    context?: ContextOverride;
    children: React.ReactNode;
}

export class SubspaceProvider<TParentState, TRootState, TSubState> extends React.Component<SubspaceProviderProps<TParentState, TRootState, TSubState>> { }

export interface UseParentSpaceOptions {
    context?: ReactReduxContext
}

export interface UseParentSpace {
    <TParentSpace>(options?: UseParentSpaceOptions): Redux.Store<TParentSpace>;
}

export const useParentSpace: UseParentSpace;

export interface ParentSpaceOptions {
    context?: ContextOverride
}

export interface ParentSpaced {
    (options?: ParentSpaceOptions): ComponentDecorator;
}

export const parentSpaced: ParentSpaced;

export interface ParentSpaceProviderProps {
    context?: ContextOverride;
    children: React.ReactNode;
}

export class ParentSpaceProvider extends React.Component<ParentSpaceProviderProps> { }
