/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import scopedMiddleware from './scopedMiddleware'
import { ROOT } from '../enhancers/subspaceTypesEnhancer'

const rootOnly = (store) => !store.subspaceTypes || store.subspaceTypes.indexOf(ROOT) >= 0

const applyToRoot = (middleware) => scopedMiddleware(middleware, rootOnly)

export default applyToRoot