/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import scopedMiddleware from './scopedMiddleware'
import { NAMESPACE_ROOT } from '../enhancers/subspaceTypesEnhancer'

const namespaceRootsOnly = (store) => !store.subspaceTypes || store.subspaceTypes.indexOf(NAMESPACE_ROOT) >= 0

const applyToNamespaceRoots = (middleware) => scopedMiddleware(middleware, namespaceRootsOnly)

export default applyToNamespaceRoots