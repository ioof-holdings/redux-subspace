/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GetStateMiddleware } from 'redux-subspace';

interface MapState<TState, TWormholeState>{
    (state: TState): TWormholeState
}

interface Wormhole {
    <TState, TWormholeState>(mapState: MapState<TState, TWormholeState>, key: string): GetStateMiddleware
}

declare let wormhole : Wormhole

export default wormhole
