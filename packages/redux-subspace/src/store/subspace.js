/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getSubState } from './subState'
import { subStateDispatch } from './dispatch'

const subspace = (mapState, namespace) => {

    if (process.env.NODE_ENV !== 'production') {
        console.assert(mapState || namespace, 'mapState and/or namespace must be defined.')
    }

    if (typeof mapState === 'string') {
        namespace = mapState
        mapState = undefined
    }

    return (store) => {
        const rootStore = store.rootStore || store
        const getState = getSubState(store.getState, rootStore.getState, mapState || ((state) => state[namespace]))
        const dispatch = subStateDispatch(store.dispatch, getState, namespace)

        return { ...store, getState, dispatch, rootStore } 
    }
}

export default subspace
