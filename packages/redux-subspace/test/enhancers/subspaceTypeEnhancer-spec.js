/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import subspaceTypeEnhancer, { ROOT, NAMESPACE_ROOT, CHILD } from '../../src/enhancers/subspaceTypeEnhancer'

describe('subspaceTypeEnhancer tests', () => {

    it('should enhance subspace with ROOT subspaceType field', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypeEnhancer()(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceType).to.equal(ROOT)
    })

    it('should enhance namespaced subspace with ROOT subspaceType field', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypeEnhancer('test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceType).to.equal(ROOT)
    })

    it('should enhance subspace with CHILD subspaceType field', () => {
        const store = { unique: 'value', subspaceType: 'anything' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy()
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypeEnhancer()(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceType).to.equal(CHILD)
    })

    it('should enhance namespaced subspace with NAMESPACE_ROOT subspaceType field', () => {
        const store = { unique: 'value', subspaceType: 'anything' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy()
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypeEnhancer('test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceType).to.equal(NAMESPACE_ROOT)
    })
})