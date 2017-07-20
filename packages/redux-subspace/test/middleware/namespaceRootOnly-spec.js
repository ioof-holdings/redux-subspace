/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import namespaceRootOnly from '../../src/middleware/namespaceRootOnly'
import { ROOT, NAMESPACE_ROOT, CHILD } from '../../src/enhancers/subspaceTypeEnhancer'

describe('namespaceRootOnly tests', () => {
    it('should forward to middleware for root store', () => {
        const store = { unique: 'value' }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = namespaceRootOnly(testMiddleware)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })

    it('should forward to middleware for root subspace', () => {
        const store = { subspaceType: ROOT }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = namespaceRootOnly(testMiddleware)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })

    it('should not forward to middleware for namespaced subspace', () => {
        const store = { subspaceType: NAMESPACE_ROOT }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = namespaceRootOnly(testMiddleware)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })

    it('should not forward to middleware for namespaced subspace', () => {
        const store = { subspaceType: CHILD }

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = namespaceRootOnly(testMiddleware)

        expect(middleware(store)).to.deep.equal({})
    })
})