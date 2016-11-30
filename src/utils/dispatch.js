/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const subStateDispatch = (dispatch, getState) => {

    const wrapDispatch = (localDispatch) => {
        return action => {
            if (typeof action === 'function') {
                // assumes thunk
                let thunk = (rootDispatch, rootGetState, ...args) => {
                    let wrappedDispatch = wrapDispatch(localDispatch, getState)
                    return action(wrappedDispatch, getState, ...args)
                }
                return localDispatch(thunk)
            } else {
                return localDispatch(action)
            }
        }
    }

    return wrapDispatch(dispatch, getState)
}

export const namespacedDispatch = (dispatch, getState, namespace) => {
    if (!namespace)
        return;

    const wrapDispatch = (localDispatch) => {
        return action => {
            if (action.type && !action.globalAction) {
                let namespacedAction = { ...action, type: `${namespace}/${action.type}` }
                return localDispatch(namespacedAction)
            } else if (typeof action === 'function') {
                // assumes thunk
                let thunk = (rootDispatch, rootGetState, ...args) => {
                    let wrappedDispatch = wrapDispatch(localDispatch, getState, namespace)
                    return action(wrappedDispatch, getState, ...args)
                }
                return localDispatch(thunk)
            } else {
                return localDispatch(action)
            }
        }
    }

    return wrapDispatch(dispatch, getState, namespace)
}