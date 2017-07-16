/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'

const applyMiddlewareFactory = (getComposable, applyComposable) => (...middlewares) => (createSubspace) => (store, mapState, namespace) => {

    const subspacedStore = createSubspace(store, mapState, namespace)

    const chain = middlewares.map(middleware => middleware(subspacedStore))
    const composable = compose(...chain)(getComposable(subspacedStore))

    return applyComposable(subspacedStore, composable)
}

export const applyGetStateMiddleware = applyMiddlewareFactory(
    (store) => store.getState,
    (store, getState) => ({ ...store, getState })
)

export const applyDispatchMiddleware = applyMiddlewareFactory(
    (store) => store.dispatch,
    (store, dispatch) => ({ ...store, dispatch })
)
