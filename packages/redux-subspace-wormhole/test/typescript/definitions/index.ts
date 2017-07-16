/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applySubspaceMiddleware } from 'redux-subspace'
import wormhole from '../../../src'

interface TState {
    value: string
}

applySubspaceMiddleware({ getState: [wormhole((state: TState) => state.value, 'test')] })
