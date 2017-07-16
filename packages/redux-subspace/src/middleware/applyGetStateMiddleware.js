/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyMiddlewareFactory from './applyMiddlewareFactory'

const applyGetStateMiddleware = applyMiddlewareFactory(
    (store) => store.getState,
    (store, getState) => ({ ...store, getState })
)

export default applyGetStateMiddleware
