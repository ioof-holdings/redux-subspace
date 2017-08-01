/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyToRoot } from 'redux-subspace'
import createSagaMiddleware from 'redux-saga'

export { default as provideStore } from './sagas/provideStore'
export { default as subspaced } from './sagas/subspaced'

export default (...params) => applyToRoot(createSagaMiddleware(...params))
