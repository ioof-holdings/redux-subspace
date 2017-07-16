/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applySubspaceMiddleware  from '../../src/middleware/applySubspaceMiddleware'

describe('applySubspaceMiddleware Tests', () => {

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

    it('should enhance subspace', () => {
        
        const createSubspace = sinon.mock().withArgs(store, mapState, namespace).returns(subspace)
        
        const enhancer = applySubspaceMiddleware()

        const enhancedSubspace = enhancer(createSubspace)(store, mapState, namespace)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
    })

    it('should enhance subspace with dispatch middleware', () => {
        
        const dispatchMiddleware1 = (store) => (next) => (action) => next({ ...action, fromFirst: store.getState().value })
        const dispatchMiddleware2 = (store) => (next) => (action) => next({ ...action, root: store.getState() })

        const createSubspace = sinon.mock().withArgs(store, mapState, namespace).returns(subspace)
        
        const enhancer = applySubspaceMiddleware({ 
            dispatch: [dispatchMiddleware1, dispatchMiddleware2]
        })

        const enhancedSubspace = enhancer(createSubspace)(store, mapState, namespace)

        enhancedSubspace.dispatch({ type: "TEST" })

        expect(subspace.dispatch).to.have.been.calledWithMatch({ 
            type: 'TEST', 
            fromFirst: 'expected', 
            root: {
                value: "expected"
            }
        })

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
    })

    it('should enhance subspace with getState middleware', () => {

        const getStateMiddleware1 = (store) => (next) => () => ({ ...next(), fromFirst: store.getState().value })
        const getStateMiddleware2 = (store) => (next) => () => ({ ...next(), root: store.getState() })

        const createSubspace = sinon.mock().withArgs(store, mapState, namespace).returns(subspace)
        
        const enhancer = applySubspaceMiddleware({ 
            getState: [getStateMiddleware1, getStateMiddleware2]
        })

        const enhancedSubspace = enhancer(createSubspace)(store, mapState, namespace)

        expect(enhancedSubspace.getState()).to.deep.equal({ 
            value: 'expected', 
            fromFirst: "expected",
            root: {
                value: "expected"
            }
        })

        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
    })

    it('should enhance subspace with middleware', () => {

        const dispatchMiddleware1 = (store) => (next) => (action) => next({ ...action, fromFirst: store.getState().fromFirst })
        const dispatchMiddleware2 = (store) => (next) => (action) => next({ ...action, root: store.getState().root })
        const getStateMiddleware1 = (store) => (next) => () => ({ ...next(), fromFirst: store.getState().value })
        const getStateMiddleware2 = (store) => (next) => () => ({ ...next(), root: store.getState() })

        const createSubspace = sinon.mock().withArgs(store, mapState, namespace).returns(subspace)
        
        const enhancer = applySubspaceMiddleware({ 
            dispatch: [dispatchMiddleware1, dispatchMiddleware2],
            getState: [getStateMiddleware1, getStateMiddleware2]
        })

        const enhancedSubspace = enhancer(createSubspace)(store, mapState, namespace)

        enhancedSubspace.dispatch({ type: "TEST" })

        expect(enhancedSubspace.getState()).to.deep.equal({ 
            value: 'expected', 
            fromFirst: "expected",
            root: {
                value: "expected"
            }
        })

        expect(subspace.dispatch).to.have.been.calledWithMatch({ 
            type: 'TEST', 
            fromFirst: "expected", 
            root: {
                value: "expected"
            }
        })
    })
})
