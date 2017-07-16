/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'

const configureSubspaces = (...enhancers) => (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)

    return {
        ...store,
        subspaceOptions: { 
            enhancer: compose(...enhancers)
        }
    }
}

export default configureSubspaces
