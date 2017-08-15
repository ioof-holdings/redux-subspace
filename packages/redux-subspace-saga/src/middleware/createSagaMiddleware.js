/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createSagaMiddleware from 'redux-saga'
import provideStore from '../sagas/provideStore'

export default (options) => {
    const sagaMiddleware = createSagaMiddleware(options)
    
    const sagaSubspaceMiddleware = (store) => {
        sagaSubspaceMiddleware.run = (saga) => sagaMiddleware.run(provideStore(store)(saga))
        return sagaMiddleware(store)
    }

    return sagaSubspaceMiddleware
}
