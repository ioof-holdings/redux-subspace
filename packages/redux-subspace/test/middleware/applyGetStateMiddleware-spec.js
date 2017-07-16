/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyGetStateMiddleware from '../../src/middleware/applyGetStateMiddleware'

describe('applyGetStateMiddleware Tests', () => {

    const state = {
        value: "expected"
    }

    const store = { unique: 'value' }

    const mapState = (state) => state
    const namespace = 'test'

    const subspace = {
        getState: sinon.stub().returns(state),
        dispatch: sinon.spy()
    }

    const middleware1Spy = sinon.spy()
    const middleware2Spy = sinon.spy()

    const middleware1 = (store) => (next) => () => {
        middleware1Spy(store)
        return { ...next(), fromFirst: 'first value' }
    }

    const middleware2 = (store) => (next) => () => {
        middleware2Spy(store)
        return { ...next(), fromSecond: 'second value' }
    }

    it('should enhance getState with middleware', () => {

        const createSubspace = sinon.mock().withArgs(store, mapState, namespace).returns(subspace)
        
        const enhancer = applyGetStateMiddleware(middleware1, middleware2)

        const enhancedSubspace = enhancer(createSubspace)(store, mapState, namespace)

        const result = enhancedSubspace.getState()

        expect(result).to.deep.equal({ value: 'expected', fromFirst: 'first value', fromSecond: 'second value' })
        expect(middleware1Spy).to.have.been.calledWith(subspace)
        expect(middleware2Spy).to.have.been.calledWith(subspace)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
    })
})
