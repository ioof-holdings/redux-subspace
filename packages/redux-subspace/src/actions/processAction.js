/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hasNamespace from '../actions/hasNamespace'
import isGlobal from '../actions/isGlobal'

const processAction = (namespace) => (action, callback, defaultValue) => {
    if (!namespace || isGlobal(action)) {
        return callback(action)
    } else if (hasNamespace(action, namespace)) {
        return callback({...action, type: action.type.substring(namespace.length + 1)})
    } else {
        return defaultValue
    }
}

export default processAction 
