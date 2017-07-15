/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Redux from 'redux';
import { MapState } from 'redux-subspace'

export interface SagaDecorator {
    <TSaga>(saga: TSaga): TSaga;
}

export interface ProvideStore {
    (store: Redux.Store<any>): SagaDecorator;
}

export const provideStore: ProvideStore;

export interface Subspaced {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): SagaDecorator;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): SagaDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): SagaDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): SagaDecorator;
    (namespace: string): SagaDecorator;
}

export const subspaced: Subspaced;
