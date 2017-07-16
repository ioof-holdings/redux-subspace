/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureSubspaces from '../../src/store/configureSubspaces'

describe('configureSubspaces Tests', () => {

    const reducer = (state) => state
    const preloadedState = { unique: 'value' }
    
    const store = {
        getState: 'getState',
        dispatch: 'dispatch'
    }

    const getStateEnhancer = (value) => `getState ${value}`
    const dispatchEnhancer = (value) => `dispatch ${value}`

    it('should configure subspace with no enhancers', () => {

        const createStore = sinon.mock().withArgs(reducer, preloadedState).returns(store)

        const storeEnhancer = configureSubspaces()
        
        const enhancedStore = storeEnhancer(createStore)(reducer, preloadedState)

        expect(enhancedStore.subspaceOptions.enhancer('test')).to.equal('test')
    })

    it('should configure subspace with getState enhancer', () => {

        const createStore = sinon.mock().withArgs(reducer, preloadedState).returns(store)

        const storeEnhancer = configureSubspaces(getStateEnhancer)
        
        const enhancedStore = storeEnhancer(createStore)(reducer, preloadedState)

        expect(enhancedStore.subspaceOptions.enhancer('test')).to.equal('getState test')
    })

    it('should configure subspace with dispatch enhancer', () => {

        const createStore = sinon.mock().withArgs(reducer, preloadedState).returns(store)

        const storeEnhancer = configureSubspaces(dispatchEnhancer)
        
        const enhancedStore = storeEnhancer(createStore)(reducer, preloadedState)

        expect(enhancedStore.subspaceOptions.enhancer('test')).to.equal('dispatch test')
    })

    it('should configure subspace with getState and dispatch enhancers', () => {

        const createStore = sinon.mock().withArgs(reducer, preloadedState).returns(store)

        const storeEnhancer = configureSubspaces( dispatchEnhancer, getStateEnhancer)
        
        const enhancedStore = storeEnhancer(createStore)(reducer, preloadedState)

        expect(enhancedStore.subspaceOptions.enhancer('test')).to.equal('dispatch getState test')
    })
})
