/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { configureSubspaces, applySubspaceMiddleware } from '../../../src'

const getStateMiddleware1 = (subspace) => (next) => () => next()
const getStateMiddleware2 = (subspace) => (next) => () => ({ ...next(), root: subspace.getState() })
const dispatchMiddleware = (subspace) => (next) => (action) => next(action)

const storeEnhancer1 = configureSubspaces(applySubspaceMiddleware({
    getState: [ getStateMiddleware1, getStateMiddleware2 ]
}))

const storeEnhancer2 = configureSubspaces(applySubspaceMiddleware({
    dispatch: [ dispatchMiddleware ]
}))

const storeEnhancer3 = configureSubspaces(applySubspaceMiddleware({
    getState: [ getStateMiddleware1, getStateMiddleware2 ],
    dispatch: [ dispatchMiddleware ]
}))