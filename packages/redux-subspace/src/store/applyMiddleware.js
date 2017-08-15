/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'
import applySubspaceMiddleware from '../enhancers/applySubspaceMiddleware'
import { subspaceEnhanced } from '../store/subspace'

const applyMiddleware = (...middlewares) => (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)

    const subspaceOptions = {
        enhancer: compose(applySubspaceMiddleware(...middlewares))
    }

    const rootStore = subspaceEnhanced((state) => state, undefined, subspaceOptions)(store)

    return {
        ...rootStore,
        subspaceOptions
    }
}

export default applyMiddleware
