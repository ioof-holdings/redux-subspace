/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Redux from 'redux';
import { MapState } from 'redux-subspace'

type Saga0 = () => Iterator<any>;
type Saga1<T1> = (arg1: T1) => Iterator<any>;
type Saga2<T1, T2> = (arg1: T1, arg2: T2) => Iterator<any>;
type Saga3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => Iterator<any>;
type Saga4<T1, T2, T3, T4> =
  (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Iterator<any>;
type Saga5<T1, T2, T3, T4, T5> =
  (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Iterator<any>;
type Saga6Rest<T1, T2, T3, T4, T5, T6> =
  (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6,
   ...rest: any[]) => Iterator<any>;

export interface SagaDecorator {
    (saga: Saga0): Saga0;
    <T1>(saga: Saga1<T1>): Saga1<T1>;
    <T1, T2>(saga: Saga2<T1, T2>): Saga2<T1, T2>;
    <T1, T2, T3>(saga: Saga3<T1, T2, T3>): Saga3<T1, T2, T3>;
    <T1, T2, T3, T4>(saga: Saga4<T1, T2, T3, T4>): Saga4<T1, T2, T3, T4>;
    <T1, T2, T3, T4, T5>(saga: Saga5<T1, T2, T3, T4, T5>): Saga5<T1, T2, T3, T4, T5>;
    <T1, T2, T3, T4, T5, T6>(saga: Saga6Rest<T1, T2, T3, T4, T5, T6>): Saga6Rest<T1, T2, T3, T4, T5, T6>;
}

export function provideStore(store: Redux.Store<any>): SagaDecorator;

export interface Subspaced {
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>): SagaDecorator;
    <TParentState, TSubState>(mapState: MapState<TParentState, any, TSubState>, namespace: string): SagaDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>): SagaDecorator;
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace: string): SagaDecorator;
    (namespace: string): SagaDecorator;
}

export const subspaced: Subspaced;
