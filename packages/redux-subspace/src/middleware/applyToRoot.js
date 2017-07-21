/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ROOT } from '../enhancers/subspaceTypesEnhancer'

const applyToRoot = (middleware) => (store) => {

    if (!store.subspaceTypes || store.subspaceTypes.indexOf(ROOT) >= 0) {
        return middleware(store)
    }
    
    return {}
}

export default applyToRoot