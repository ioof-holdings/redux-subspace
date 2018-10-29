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

    let dispatch = () => {
        throw new Error(
            'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        )
      }

    let { getState, subscribe, replaceReducer, ...subspaceValues } = subspacedStore

    const middlewareApi = {
        ...subspaceValues,
        getState: (...args) => getState(...args),
        dispatch: (...args) => dispatch(...args)
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
