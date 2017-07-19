/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isGlobal from '../actions/isGlobal'
import hasNamespace from '../actions/hasNamespace'

export default (namespace) => (reducer) =>  {
    return (state, action) => {
        if (typeof state === 'undefined' || isGlobal(action)) {
            return reducer(state, action)
        }

        if (hasNamespace(action, namespace)) {
            let theAction = {...action, type: action.type.substring(namespace.length + 1)}
            return reducer(state, theAction)
        }

        return state
    }
}
