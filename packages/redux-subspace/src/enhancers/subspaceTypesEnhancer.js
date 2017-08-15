/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

 export const ROOT = 'ROOT'
 export const NAMESPACE_ROOT = 'NAMESPACE_ROOT'
 export const CHILD = 'CHILD'

const subspaceTypesEnhancer = (namespace) => (createSubspace) => (store) => {
    const subspace = createSubspace(store)

    const subspaceTypes = []

    if (!store.subspaceTypes) {
        subspaceTypes.push(ROOT)
        subspaceTypes.push(NAMESPACE_ROOT)
    } else if (namespace) {
        subspaceTypes.push(NAMESPACE_ROOT)
        subspaceTypes.push(CHILD)
    } else {
        subspaceTypes.push(CHILD)
    }

    return { ...subspace, subspaceTypes }
}

export default subspaceTypesEnhancer
