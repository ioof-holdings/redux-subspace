/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { runSaga } from 'redux-saga'
import { getContext, takeEvery } from 'redux-saga/effects'
import { subspace, GlobalActions } from 'redux-subspace'
import provideStore from './provideStore'

const remove = (array, item) => {
  const index = array.indexOf(item)
  if (index >= 0) {
    array.splice(index, 1)
  }
}

const emitter = () => {
    const subscribers = []

    function subscribe(sub) {
        subscribers.push(sub)
        return () => remove(subscribers, sub)
    }

    function emit(item) {
        const arr = subscribers.slice()
        for (var i = 0, len = arr.length; i < len; i++) {
            arr[i](item)
        }
    }

    return {
        subscribe,
        emit,
    }
}

const subspaced = (mapState, namespace) => {

    const subspaceDecorator = subspace(mapState, namespace)

    return (saga) => {
        return function* wrappedSaga() {
            const parentStore = yield getContext('store')

            const sagaEmitter = emitter()
            
            const store = {
                ...subspaceDecorator(parentStore),
                subscribe: sagaEmitter.subscribe,
            }

            runSaga(store, provideStore(store)(saga))

            yield takeEvery('*', function* (action) {
                if (!namespace || GlobalActions.isGlobal(action)) {
                    sagaEmitter.emit(action)
                } else if (action.type && action.type.indexOf(`${namespace}/`) === 0) {
                    let theAction = {...action, type: action.type.substring(namespace.length + 1)}
                    sagaEmitter.emit(theAction)
                }
            })
        }
    }
}

export default subspaced
