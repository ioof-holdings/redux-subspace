/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { configureSubspaces } from '../../../src'


const reducer = (state) => state

const subspaceEnhancer = (createSubspace) => (store, mapState, namespace) => {
    return createSubspace(store, mapState, namespace)
}

const store = createStore(reducer, configureSubspaces(subspaceEnhancer))
