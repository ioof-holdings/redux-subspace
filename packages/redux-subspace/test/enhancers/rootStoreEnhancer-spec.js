/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import rootStoreEnhancer from '../../src/enhancers/rootStoreEnhancer'

describe('rootStoreEnhancer tests', () => {

    it('should enhance subspace with rootStore field', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } } }),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = rootStoreEnhancer(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.rootStore).to.equal(store)
    })

    it('should use existing rootStore field', () => {
        const rootStore = { unique: 'value' }
        const store = { rootStore }

        const subspace = {
            getState: sinon.spy(),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = rootStoreEnhancer(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.rootStore).to.equal(rootStore)
    })
})