/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { applyMiddleware } from '../../../src'

const getStateMiddleware1 = (subspace) => (next) => () => next()
const getStateMiddleware2 = (subspace) => (next) => () => ({ ...next(), root: subspace.rootStore.getState() })
const dispatchMiddleware1 = (subspace) => (next) => (action) => next(action)
const dispatchMiddleware2 = (subspace) => (next) => (action) => next({ ...action, root: subspace.rootStore.getState() })

const storeEnhancer1 = applyMiddleware(dispatchMiddleware1, dispatchMiddleware2)

const storeEnhancer2 = applyMiddleware({
    getState: [ getStateMiddleware1, getStateMiddleware2 ]
})

const storeEnhancer3 = applyMiddleware({
    dispatch: [ dispatchMiddleware1, dispatchMiddleware2 ]
})

const storeEnhancer4 = applyMiddleware({
    getState: [ getStateMiddleware1, getStateMiddleware2 ],
    dispatch: [ dispatchMiddleware1, dispatchMiddleware2 ]
})