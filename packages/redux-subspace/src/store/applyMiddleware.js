/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applySubspaceMiddleware from '../enhancers/applySubspaceMiddleware'
import { subspaceRoot } from '../store/subspace'

const applyMiddleware = (...middlewares) => (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    return subspaceRoot(store, { enhancer: applySubspaceMiddleware(...middlewares) })
}

export default applyMiddleware
