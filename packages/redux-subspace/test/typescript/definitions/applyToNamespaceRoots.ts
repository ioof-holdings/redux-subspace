/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from 'redux'
import { applyMiddleware, applyToNamespaceRoots, SubspaceMiddleware } from '../../../src'

const reduxMiddleware: Middleware = (store) => (next) => (action) => next(action)

const subspaceMiddleware: SubspaceMiddleware = (subspace) => ({
    dispatch: (next) => (action) => next(action)
})

applyMiddleware(applyToNamespaceRoots(reduxMiddleware))

applyMiddleware(applyToNamespaceRoots(subspaceMiddleware))
