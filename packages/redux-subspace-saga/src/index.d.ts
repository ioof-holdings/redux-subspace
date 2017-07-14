/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Redux from 'redux';
import { MapState } from 'redux-subspace'

export interface WithStore {
    <TSaga>(saga: TSaga, store: Redux.Store<any>): TSaga
}

export const withStore: WithStore

export interface Subspaced {
    <TSaga, TParentState, TRootState, TSubState>(saga: TSaga, mapState: MapState<TParentState, TRootState, TSubState>, namespace?: string): TSaga;
}

export const subspaced: Subspaced