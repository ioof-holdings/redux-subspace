/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import subspaceEnhancer from '../../src/enhancers/subspaceEnhancer'

describe('subspaceEnhancer tests', () => {

    it('should enhance getState with sub-state', () => {
        const store = { 
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } }, other: 'value' }),
            dispatch: sinon.spy(),
        }

        const subspace = {
            getState: store.getState,
            dispatch: store.dispatch,
            rootStore: store
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceEnhancer((state, rootState) => ({ ...state.parent, other: rootState.other }))(createSubspace)(store)

        expect(enhancedSubspace.getState()).to.deep.equal({ child: { value: 'expected' }, other: 'value' })
    })

    it('should raise error if getState returns undefined', () => {
        const store = { 
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } } }),
            dispatch: sinon.spy(),
        }

        const subspace = {
            getState: store.getState,
            dispatch: store.dispatch,
            rootStore: store
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceEnhancer(() => undefined)(createSubspace)(store)

        expect(() => enhancedSubspace.getState()).to.throw('mapState must not return undefined.')
    })

    it('should not raise error if getState returns undefined in production', () => {
        const store = { 
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } } }),
            dispatch: sinon.spy(),
        }

        const subspace = {
            getState: store.getState,
            dispatch: store.dispatch,
            rootStore: store
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceEnhancer(() => undefined)(createSubspace)(store)

        const nodeEnv = process.env.NODE_ENV

        try {
            process.env.NODE_ENV = 'production'


            expect(enhancedSubspace.getState()).to.be.undefined
        } finally {
            process.env.NODE_ENV = nodeEnv
        }
    })

    it('should enhance dispatch with namepace', () => {
        const store = { 
            getState: sinon.stub().returns({ unique: 'value' }),
            dispatch: sinon.spy(),
        }

        const subspace = {
            getState: store.getState,
            dispatch: store.dispatch,
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceEnhancer((state) => state, 'test')(createSubspace)(store)

        enhancedSubspace.dispatch({ type: 'TEST', value: 'expected' })

        expect(subspace.dispatch).to.be.calledWithMatch({ type: 'test/TEST', value: 'expected' })
    })
})