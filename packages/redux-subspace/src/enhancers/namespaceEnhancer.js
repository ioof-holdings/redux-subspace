/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const namespaceEnhancer = (namespace) => (createSubspace) => (store) => {
    const subspace = createSubspace(store)

    const parentNamespace = store.namespace || ''

    let storeNamespace
    
    if (!namespace) {
        storeNamespace = parentNamespace
    } else if (parentNamespace) {
        storeNamespace = `${parentNamespace}/${namespace}`
    } else {
        storeNamespace = namespace
    }

    return { ...subspace, namespace: storeNamespace }
}

export default namespaceEnhancer
