/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'
import applyDispatchMiddleware from './applyDispatchMiddleware'
import applyGetStateMiddleware from './applyGetStateMiddleware'

const applySubspaceMiddleware = ({ dispatch = [], getState = [] } = {}) => {

    const enhancers = [
        applyDispatchMiddleware(...dispatch),
        applyGetStateMiddleware(...getState)
    ]

    return compose(...enhancers)
}

export default applySubspaceMiddleware
