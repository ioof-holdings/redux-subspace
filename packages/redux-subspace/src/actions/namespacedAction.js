/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isGlobal from './isGlobal'

const namespacedAction = (namespace) => (action) => namespace && !isGlobal(action, namespace) 
    ? { ...action, type: `${namespace}/${action.type}` } 
    : action

export default namespacedAction