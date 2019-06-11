/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as subspace } from './store/subspace'
export { default as parentSpace } from './store/parentSpace'
export { default as applyMiddleware } from './store/applyMiddleware'

export { default as namespaced } from './reducers/namespaced'

export { default as namespacedAction } from './actions/namespacedAction'
export { default as globalAction } from './actions/globalAction'

export { default as applyToRoot } from './middleware/applyToRoot'
export { default as applyToNamespaceRoots } from './middleware/applyToNamespaceRoots'
export { default as applyToChildren } from './middleware/applyToChildren'

export { default as globalActions } from './middleware/globalActions'
