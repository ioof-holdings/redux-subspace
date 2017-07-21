/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'
import subspaceEnhancer from '../enhancers/subspaceEnhancer'
import namespaceEnhancer from '../enhancers/namespaceEnhancer'
import rootStoreEnhancer from '../enhancers/rootStoreEnhancer'
import subspaceTypesEnhancer from '../enhancers/subspaceTypesEnhancer'
import processActionEnhancer from '../enhancers/processActionEnhancer'

const createSubspace = (store, enhancer) => {

    if (typeof enhancer !== 'undefined') {
        return enhancer(createSubspace)(store)
    }

    return store
}

const resolveParameters = (mapState, namespace, enhancer) => {

    const mapStateType = typeof mapState
    const namespaceType = typeof namespace
    const enhancerType = typeof enhancer

    let params = {}

    if (mapStateType === 'function') {
        params.mapState = mapState
    } else if (mapStateType === 'string') {
        params.mapState = (state) => state[mapState]
    } else if (!mapState && namespaceType === 'string') {
        params.mapState = (state) => state[namespace]
    }

    if (namespaceType === 'string') {
        params.namespace = namespace
    } else if (mapStateType === 'string') {
        params.namespace = mapState
    }

    if (namespaceType === 'object' && typeof namespace.enhancer === 'function') {
        params.enhancer = namespace.enhancer
    } else if (enhancerType === 'function') {
        params.enhancer = enhancer
    } else if (enhancerType === 'undefined') {
        params.enhancer = (s) => s
    } else {
        if (process.env.NODE_ENV !== 'production') {
            console.assert(enhancerType === 'function', 'enhancer must be a function.')
        }

        params.enhancer = (s) => s
    }

    if (process.env.NODE_ENV !== 'production') {
        console.assert(params.mapState || params.namespace, 'mapState and/or namespace must be defined.')
    }

    return params
}

export const subspaceEnhanced = (mapState, namespace, { enhancer } = {}) => {

    const resolvedParams = resolveParameters(mapState, namespace, enhancer)

    mapState = resolvedParams.mapState
    namespace = resolvedParams.namespace
    enhancer = resolvedParams.enhancer

    const subspaceEnhancers = compose(
        subspaceEnhancer(mapState, namespace),
        namespaceEnhancer(namespace),
        subspaceTypesEnhancer(namespace),
        processActionEnhancer(namespace),
        rootStoreEnhancer,
    )

    return (store) => {
        if (store.subspaceOptions) {
            enhancer = store.subspaceOptions.enhancer
        }

        return createSubspace(store, compose(enhancer, subspaceEnhancers))
    }
}

const subspace = (mapState, namespace) => subspaceEnhanced(mapState, namespace)

export default subspace
