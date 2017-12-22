/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { runSaga } from 'redux-saga'
import { getContext, takeEvery } from 'redux-saga/effects'
import { subspace } from 'redux-subspace'
import provideStore from './provideStore'

const emitter = () => {
    const subscribers = []

    function subscribe(sub) {
        subscribers.push(sub)
        return () => {
            subscribers.splice(subscribers.indexOf(sub), 1)
        }
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
        return function* wrappedSaga(...args) {
            const parentStore = yield getContext('store')
            const sagaMiddlewareOptions = yield getContext('sagaMiddlewareOptions')

            const sagaEmitter = emitter()
            
            const store = {
                ...sagaMiddlewareOptions,
                ...subspaceDecorator(parentStore),
                subscribe: sagaEmitter.subscribe,
            }

            runSaga(store, provideStore(store, sagaMiddlewareOptions)(saga), ...args)

            yield takeEvery('*', function* (action) {
                store.processAction(action, sagaEmitter.emit)
                yield
            })
        }
    }
}

export default subspaced
