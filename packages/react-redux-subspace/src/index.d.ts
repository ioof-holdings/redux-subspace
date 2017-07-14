/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Redux from 'redux';
import { MapState } from 'redux-subspace'

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

export interface Subspaced {
    <TParentState, TRootState, TSubState>(mapState: MapState<TParentState, TRootState, TSubState>, namespace?: string): ComponentDecorator;
}

export const subspaced: Subspaced

export interface SubspaceProviderProps<TParentState, TRootState, TSubState> {
    mapState: MapState<TParentState, TRootState, TSubState>;
    namespace?: string;
    children?: React.ReactNode;
}

export class SubspaceProvider<TParentState, TRootState, TSubState> extends React.Component<SubspaceProviderProps<TParentState, TRootState, TSubState>> { }