/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyMiddleware } from 'redux-subspace'
import wormhole from '../../../src'

interface TState {
    value: string
}

applyMiddleware(wormhole((state: TState) => state.value, 'test'))
applyMiddleware(wormhole('test', 'test'))
applyMiddleware(wormhole('test'))
