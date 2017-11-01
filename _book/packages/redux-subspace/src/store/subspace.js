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
import rootStoreEnhancer from '../enhancers/rootStoreEnhancer'
import subspaceTypesEnhancer from '../enhancers/subspaceTypesEnhancer'
import processActionEnhancer from '../enhancers/processActionEnhancer'

const resolveParameters = (mapState, namespace) => {
    if (process.env.NODE_ENV !== 'production') {
        console.assert(mapState || namespace, 'mapState and/or namespace must be defined.')
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

    const enhancerCheck = typeof enhancer === 'function'

    if (process.env.NODE_ENV !== 'production') {
        console.assert(enhancerCheck, 'enhancer must be a function.')
    } else if (!enhancerCheck) {
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
        rootStoreEnhancer
    )

    return (store) => createSubspace(store, compose(resolveEnhancer(store.subspaceOptions), subspaceEnhancers))
}

export const subspaceRoot = (store, subspaceOptions) => subspaceEnhanced(undefined, undefined, true)({ ...store, subspaceOptions})

const subspace = (mapState, namespace) => subspaceEnhanced(...resolveParameters(mapState, namespace))

export default subspace
