/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyMiddleware from '../../src/store/applyMiddleware'

// const applyMiddleware = (...middlewares) => (createStore) => (reducer, preloadedState, enhancer) => {
//     const store = createStore(reducer, preloadedState, enhancer)

//     const subspaceOptions = {
//         enhancer: compose(applySubspaceMiddleware(...middlewares))
//     }

//     const rootStore = subspaceEnhanced((state) => state, undefined, subspaceOptions)(store)

//     return {
//         ...rootStore,
//         subspaceOptions
//     }
// }

describe('applyMiddleware tests', () => {

    it('should maintain root store state', () => {
        const reducer = () => null
        const store = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middleware = () => (next) => (action) => next(action)
    
        const createStore = sinon.mock().withArgs(reducer).returns(store)

        const enhancedStore = applyMiddleware(middleware)(createStore)(reducer)

        expect(enhancedStore.getState()).to.deep.equal({ value: 'expected' })
    })

    it('should enhance store with middleware', () => {
        const reducer = () => null
        const store = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware = () => (next) => (action) => {
            middlewareSpy(action)
            return next(action)
        }
    
        const createStore = sinon.mock().withArgs(reducer).returns(store)

        const enhancedStore = applyMiddleware(middleware)(createStore)(reducer)

        enhancedStore.dispatch({ type: 'TEST', value: 'expected' })

        expect(enhancedStore.getState()).to.deep.equal({ value: 'expected' })
        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
        expect(middlewareSpy).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })

    it('should enhance store with subspace options', () => {
        const reducer = () => null
        const store = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middleware = () => (next) => (action) => next(action)
    
        const createStore = sinon.mock().withArgs(reducer).returns(store)

        const enhancedStore = applyMiddleware(middleware)(createStore)(reducer)

        expect(enhancedStore.subspaceOptions.enhancer).to.be.a('function')
    })
})