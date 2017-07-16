/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as subspace } from '../src/store/subspace'
export { default as namespaced } from '../src/reducers/namespaced'
export { default as configureSubspaces } from '../src/store/configureSubspaces'
export { default as applySubspaceMiddleware } from '../src/middleware/applySubspaceMiddleware'
export { asGlobal, GlobalActions } from '../src/actions/GlobalActions'
