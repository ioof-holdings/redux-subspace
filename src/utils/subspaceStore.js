/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getSubState } from '../utils/subState'
import { subStateDispatch } from '../utils/dispatch'

const subspaceStore = (store, mapState, namespace) => {
    const rootStore = store.rootStore || store
    const getState = getSubState(store.getState, rootStore.getState, mapState)
    const dispatch = subStateDispatch(store.dispatch, getState, namespace)

    return { ...store, getState, dispatch, rootStore } 
}

export default subspaceStore