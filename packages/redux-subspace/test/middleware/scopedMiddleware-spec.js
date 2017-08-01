/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import scopedMiddleware from '../../src/middleware/scopedMiddleware'

describe('scopedMiddleware tests', () => {
    it('should forward to middleware', () => {
        const store = { unique: 'value' }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = scopedMiddleware(testMiddleware, (storeParam) => storeParam === store)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })

    it('should not forward to middleware', () => {
        const store = { unique: 'value' }

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = scopedMiddleware(testMiddleware, () => false)

        expect(middleware(store)).to.deep.equal({})
    })

    it('should copy properties on middleware', () => {
        const testMiddleware = (store) => (next) => (action) => next(store, action)

        testMiddleware.testProperty = 'expected'

        const middleware = scopedMiddleware(testMiddleware, () => true)

        expect(middleware.testProperty).to.equal('expected')
    })

    it('should copy properties on applied middleware', () => {
        const store = { unique: 'value' }

        const testMiddleware = (store) => {
            testMiddleware.testProperty = 'expected'
            return (next) => (action) => next(store, action)
        }

        const middleware = scopedMiddleware(testMiddleware, () => true)

        middleware(store)

        expect(middleware.testProperty).to.equal('expected')
    })
})
