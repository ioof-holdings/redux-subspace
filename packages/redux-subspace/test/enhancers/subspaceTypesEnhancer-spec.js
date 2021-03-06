/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import subspaceTypesEnhancer, { ROOT, NAMESPACE_ROOT, CHILD } from '../../src/enhancers/subspaceTypesEnhancer'

describe('subspaceTypeEnhancer tests', () => {

    it('should enhance root subspace', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypesEnhancer(true)(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceTypes).to.deep.equal([ROOT, NAMESPACE_ROOT])
    })

    it('should enhance child subspace', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy()
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypesEnhancer(false)(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceTypes).to.deep.equal([CHILD])
    })

    it('should enhance namespaced child subspace', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({}),
            dispatch: sinon.spy()
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = subspaceTypesEnhancer(false, 'test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.subspaceTypes).to.deep.equal([NAMESPACE_ROOT, CHILD])
    })
})