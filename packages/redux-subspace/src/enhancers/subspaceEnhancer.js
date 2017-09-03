/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applySubspaceMiddleware from './applySubspaceMiddleware'
import namespacedAction from '../actions/namespacedAction'
import applyToChildren from '../middleware/applyToChildren'

const verifyState = (state) => {
    if (process.env.NODE_ENV !== 'production') {
        console.assert(state !== undefined, 'mapState must not return undefined.')
    }
    return state
}

const subspaceEnhancer = (mapState, namespace) => applySubspaceMiddleware(applyToChildren((store) => ({
    getState: (next) => () => verifyState(mapState(next(), store.rootStore.getState())),
    dispatch: (next) => (action) => next(namespacedAction(namespace)(action))
})))

export default subspaceEnhancer
