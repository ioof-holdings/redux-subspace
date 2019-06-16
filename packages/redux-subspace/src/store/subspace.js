/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'
import subspaceEnhancer from '../enhancers/subspaceEnhancer'
import namespaceEnhancer from '../enhancers/namespaceEnhancer'
import hierarchyEnhancer from '../enhancers/hierarchyEnhancer'
import subspaceTypesEnhancer from '../enhancers/subspaceTypesEnhancer'
import processActionEnhancer from '../enhancers/processActionEnhancer'

const resolveParameters = (mapState, namespace) => {
    if (process.env.NODE_ENV !== 'production' && !(mapState || namespace)) {
        throw new TypeError('mapState and/or namespace must be defined.')
    }

    const mapStateType = typeof mapState
    const namespaceType = typeof namespace

    if (mapStateType === 'string' && namespaceType !== 'null') {
        namespace = mapState
    }

    if (mapStateType !== 'function') {
        mapState = (state) => state[namespace]
    }

    return [mapState, namespace]
}

const DEFAULT_OPTIONS = {
    enhancer: (subspace) => subspace
}

const resolveEnhancer = ({ enhancer = DEFAULT_OPTIONS.enhancer } = DEFAULT_OPTIONS) => {
    if (typeof enhancer !== 'function') {
        if (process.env.NODE_ENV !== 'production') {
            throw new TypeError('enhancer must be a function.')
        }
        return DEFAULT_OPTIONS.enhancer
    }

    return enhancer 
}

const createSubspace = (store, enhancer) => {

    if (typeof enhancer !== 'undefined') {
        return enhancer(createSubspace)(store)
    }

    return store
}

const subspaceEnhanced = (mapState, namespace, isRoot) => {
    const subspaceEnhancers = compose(
        subspaceEnhancer(mapState, namespace),
        namespaceEnhancer(namespace),
        subspaceTypesEnhancer(isRoot, namespace),
        processActionEnhancer(namespace),
        hierarchyEnhancer
    )

    return (store) => createSubspace(store, compose(resolveEnhancer(store.subspaceOptions), subspaceEnhancers))
}

export const subspaceRoot = (store, subspaceOptions) => subspaceEnhanced(undefined, undefined, true)({ ...store, subspaceOptions})

const subspace = (mapState, namespace) => subspaceEnhanced(...resolveParameters(mapState, namespace))

export default subspace
