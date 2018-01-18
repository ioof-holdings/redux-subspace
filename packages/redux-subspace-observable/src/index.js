/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyToRoot } from 'redux-subspace'
import { createEpicMiddleware as baseCreateEpicMiddleware } from 'redux-observable'

export { default as subspaced } from './observable/subspaced'

export const createEpicMiddleware = (rootEpic, options = {}) =>
    applyToRoot(store =>
        baseCreateEpicMiddleware(rootEpic, { ...options, dependencies: { ...options.dependencies, store } })(store)
    )
