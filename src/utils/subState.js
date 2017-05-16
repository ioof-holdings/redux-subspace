/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getSubState = (getState, mapState) => () => {
    let parentState = getState()
    let rootState = parentState.root || parentState
    let subState = mapState(parentState, rootState)

    if (process.env.NODE_ENV !== 'production') {
        console.assert(subState !== undefined, 'mapState must not return undefined.')
    }

    if (typeof subState === 'object' && !Array.isArray(subState)) {
        return { ...subState, root: rootState }
    } else {
        return subState
    }
}