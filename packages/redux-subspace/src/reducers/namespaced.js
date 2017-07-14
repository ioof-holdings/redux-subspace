/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalActions } from '../actions/GlobalActions'

export default (reducer, namespace) => {
    return (state, action) => {
        if (typeof state === 'undefined' || GlobalActions.isGlobal(action)) {
            return reducer(state, action)
        }

        if (action && action.type && action.type.indexOf(`${namespace}/`) === 0) {
            let theAction = {...action, type: action.type.substring(namespace.length + 1)}
            return reducer(state, theAction)
        }

        return state
    }
}