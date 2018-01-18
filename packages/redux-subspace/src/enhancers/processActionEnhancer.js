/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import processAction from '../actions/processAction'

const processActionEnhancer = (namespace) => (createSubspace) => (store) => {
    const subspace = createSubspace(store)

    return { ...subspace, processAction: processAction(namespace) }
}

export default processActionEnhancer