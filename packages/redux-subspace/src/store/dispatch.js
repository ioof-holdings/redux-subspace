/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalActions } from '../actions/GlobalActions'

export const subStateDispatch = (dispatch, getState, namespace) => {
    return action => {
        if (namespace && action.type && !GlobalActions.isGlobal(action)) {
            action = { ...action, type: `${namespace}/${action.type}` }
        }

        return dispatch(action)
    }
}
