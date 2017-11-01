/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'

const applySubspaceMiddleware = (...middlewares) => (createSubspace) => (store) => {

    const subspacedStore = createSubspace(store)

    let getState = subspacedStore.getState
    let dispatch = subspacedStore.dispatch

    const { namespace, rootStore, subspaceTypes, processAction } = subspacedStore

    const middlewareApi = {
        getState: (...args) => getState(...args),
        dispatch: (...args) => dispatch(...args),
        rootStore,
        namespace,
        subspaceTypes,
        processAction
    }

    const chain = middlewares.map((middleware) => middleware(middlewareApi))
        .map((pipeline) => typeof pipeline === 'function' ? { dispatch: pipeline } : pipeline)

    const getStateChain = chain.map(pipeline => pipeline.getState).filter(pipeline => pipeline)
    const dispatchChain = chain.map(pipeline => pipeline.dispatch).filter(pipeline => pipeline)

    getState = compose(...getStateChain)(subspacedStore.getState)
    dispatch = compose(...dispatchChain)(subspacedStore.dispatch)

    return {
        ...subspacedStore,
        getState,
        dispatch
    }
}

export default applySubspaceMiddleware
