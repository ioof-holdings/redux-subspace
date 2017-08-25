/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

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

            if (isPlainObject(state)) {
                return { [key]: mapState(store.rootStore.getState()), ...state }
            } else {
                return state
            }
        }
    })
}

export default wormhole
