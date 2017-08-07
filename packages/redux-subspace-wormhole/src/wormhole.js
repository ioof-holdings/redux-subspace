/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const wormhole = (mapState, key) => {

    if (typeof mapState === 'string') {
        const mapStateKey = mapState
        mapState = (state) => state[mapStateKey]

        if (typeof key === 'undefined') {
            key = mapStateKey
        }
    }

    return (store) => ({
        getState: (next) => () => {
            const state = next()

            if (typeof state === 'object' && !Array.isArray(state)) {
                return { [key]: mapState(store.rootStore.getState()), ...state }
            } else {
                return state
            }
        }
    })
}

export default wormhole
