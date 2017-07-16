/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getSubState = (getState, getRootState, mapState) => () => {
    let parentState = getState()
    let rootState = getRootState()
    let subState = mapState(parentState, rootState)

    if (process.env.NODE_ENV !== 'production') {
        console.assert(subState !== undefined, 'mapState must not return undefined.')
    }

    return subState
}
