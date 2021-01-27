/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux'
import { Epic } from 'redux-observable'
import { MapState } from 'redux-subspace'

export interface EpicDecorator {
    <T extends Action, O extends T = T, S = void, D = any>(epic: Epic<T, O, S, D>): Epic<T, O, S, D>
}

export interface Subspaced {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): EpicDecorator;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): EpicDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): EpicDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): EpicDecorator;
    <TParentState>(namespace: keyof TParentState): EpicDecorator;
    <TParentState>(mapState: keyof TParentState, namespace: string): EpicDecorator;
}

export const subspaced: Subspaced;

export { createEpicMiddleware } from 'redux-observable';
