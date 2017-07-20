/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

 export const ROOT = 'ROOT'
 export const NAMESPACE_ROOT = 'NAMESPACE_ROOT'
 export const CHILD = 'CHILD'

const rootStoreEnhancer = (namespace) => (createSubspace) => (store) => {
    const subspace = createSubspace(store)

    let subspaceType = CHILD

    if (!store.subspaceType) {
        subspaceType = ROOT
    } else if (namespace) {
        subspaceType = NAMESPACE_ROOT
    }

    return { ...subspace, subspaceType }
}

export default rootStoreEnhancer
