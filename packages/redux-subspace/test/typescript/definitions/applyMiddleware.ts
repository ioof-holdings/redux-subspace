/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from 'redux'
import { applyMiddleware, SubspaceMiddleware } from '../../../src'

const reduxMiddleware: Middleware = (store) => (next) => (action) => next(action)

const subspaceMiddleware1: SubspaceMiddleware = (subspace) => ({
    dispatch: (next) => (action) => next(action)
})

const subspaceMiddleware2: SubspaceMiddleware = (subspace) => ({
    getState: (next) => () => next()
})

const subspaceMiddleware3: SubspaceMiddleware = (subspace) => ({
    getState: (next) => () => next(),
    dispatch: (next) => (action) => next(action)
})

const storeEnhancer1 = applyMiddleware(reduxMiddleware)
const storeEnhancer2 = applyMiddleware(subspaceMiddleware1, subspaceMiddleware2, subspaceMiddleware3)
const storeEnhancer3 = applyMiddleware(reduxMiddleware, subspaceMiddleware1, subspaceMiddleware2, subspaceMiddleware3)
