/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ROOT } from '../enhancers/subspaceTypeEnhancer'

const rootOnly = (middleware) => (store) => {

    if (!store.subspaceType || store.subspaceType === ROOT) {
        return middleware(store)
    }
    
    return {}
}

export default rootOnly