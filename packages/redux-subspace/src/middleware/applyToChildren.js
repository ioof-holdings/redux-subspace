/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import scopedMiddleware from './scopedMiddleware'
import { CHILD } from '../enhancers/subspaceTypesEnhancer'

const childrenOnly = (store) => store.subspaceTypes && store.subspaceTypes.indexOf(CHILD) >= 0

const applyToChildren = (middleware) => scopedMiddleware(middleware, childrenOnly)

export default applyToChildren