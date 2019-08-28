/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { runSaga, stdChannel } from 'redux-saga'
import { getContext, takeEvery } from 'redux-saga/effects'
import { subspace } from 'redux-subspace'
import provideStore from './provideStore'

const subspaced = (mapState, namespace) => {
  const subspaceDecorator = subspace(mapState, namespace)

  return saga => {
    return function*(...args) {
      const parentStore = yield getContext('store')
      const sagaMiddlewareOptions = yield getContext('sagaMiddlewareOptions')

      const channel = stdChannel()

      const store = {
        ...sagaMiddlewareOptions,
        ...subspaceDecorator(parentStore),
        channel
      }

      runSaga(store, provideStore(store, sagaMiddlewareOptions)(saga), ...args)

      yield takeEvery('*', function*(action) {
        store.processAction(action, channel.put)
        yield
      })
    }
  }
}

export default subspaced
