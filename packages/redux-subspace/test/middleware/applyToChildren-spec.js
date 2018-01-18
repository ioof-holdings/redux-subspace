/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyToChildren from '../../src/middleware/applyToChildren'
import { ROOT, NAMESPACE_ROOT, CHILD } from '../../src/enhancers/subspaceTypesEnhancer'

describe('applyToNamespaceRoots tests', () => {
    it('should not forward to middleware for root store', () => {
        const store = { unique: 'value' }

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = applyToChildren(testMiddleware)

        expect(middleware(store)).to.deep.equal({})
    })

    it('should not forward to middleware for root subspace', () => {
        const store = { subspaceTypes: [ROOT, NAMESPACE_ROOT] }

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = applyToChildren(testMiddleware)

        expect(middleware(store)).to.deep.equal({})
    })

    it('should forward to middleware for namespaced subspace', () => {
        const store = { subspaceTypes: [NAMESPACE_ROOT, CHILD] }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = applyToChildren(testMiddleware)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })

    it('should forward to middleware for namespaced subspace', () => {
        const store = { subspaceTypes: [CHILD] }
        const middlewareSpy = sinon.spy()

        const testMiddleware = (store) => (next) => (action) => next(store, action)

        const middleware = applyToChildren(testMiddleware)

        middleware(store)(middlewareSpy)({ type: 'TEST', value: 'expected' })

        expect(middlewareSpy).to.be.calledWithMatch(store, { type: 'TEST', value: 'expected'})
    })
})