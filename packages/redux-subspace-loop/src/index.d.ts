/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Redux from 'redux';

export interface ReducerDecorator {
  <TState>(reducer: Redux.Reducer<TState>): Redux.Reducer<TState>;
}

export interface Namespaced {
  (namespace: string): ReducerDecorator;
}

export const namespaced: Namespaced;
