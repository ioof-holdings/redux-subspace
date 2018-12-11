/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import processAction from '../actions/processAction'

export default (namespace) => {
    const actionProcessor = processAction(namespace)
    return (reducer) => (state, action) => {
        if (typeof state === 'undefined') {
            return reducer(state, action)
        }

        const defaultState = reducer(state, action)

        return actionProcessor(action, (transformedAction) => reducer(state, transformedAction), defaultState)
    }
}
