/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createSagaMiddleware from '../../src/middleware/createSagaMiddleware'
import { getContext } from 'redux-saga/effects'

describe('createSagaMiddleware tests', () => {
    it('should create saga middleware', () => {
        const store = { getState: () => 'state', dispatch: sinon.spy() }

        const middleware = createSagaMiddleware()

        middleware(store)(store.dispatch)({ type: 'TEST', value: 'expected' })

        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST', value: 'expected'})
    })

    it('should run saga with store in context', () => {
        let contextStore

        function* saga() {
            contextStore = yield getContext('store')
        }
        
        const store = { getState: () => 'state', dispatch: sinon.spy() }

        const middleware = createSagaMiddleware()

        middleware(store)

        middleware.run(saga)

        expect(contextStore).to.equal(store)
    })
})