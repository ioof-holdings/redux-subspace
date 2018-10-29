/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applySubspaceMiddleware from '../enhancers/applySubspaceMiddleware'
import { subspaceRoot } from '../store/subspace'
import { compose } from 'redux'

const applyMiddleware = (...middlewares) => (createStore) => (...args) => {
    const store = createStore(...args)

    if(store.subspaceOptions && typeof store.subspaceOptions.enhancer === "function") {
        return subspaceRoot(store, { enhancer: compose(applySubspaceMiddleware(...middlewares), store.subspaceOptions.enhancer)})
    }
    
    return subspaceRoot(store, { enhancer: applySubspaceMiddleware(...middlewares) })
}

export default applyMiddleware
