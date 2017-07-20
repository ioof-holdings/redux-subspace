/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ROOT, NAMESPACE_ROOT } from '../enhancers/subspaceTypeEnhancer'

const namespaceRootOnly = (middleware) => (store) => {

    if (!store.subspaceType || store.subspaceType === ROOT || store.subspaceType === NAMESPACE_ROOT) {
        return middleware(store)
    }
    
    return {}
}

export default namespaceRootOnly