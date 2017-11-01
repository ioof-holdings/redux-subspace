/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import namespaceEnhancer from '../../src/enhancers/namespaceEnhancer'

describe('namespaceEnhancer tests', () => {

    it('should enhance subspace with namespace field', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } } }),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = namespaceEnhancer('test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.namespace).to.equal('test')
    })

    it('should prefix namespace field with parent namepace', () => {
        const store = { unique: 'value', namespace: 'parent' }

        const subspace = {
            getState: sinon.spy(),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = namespaceEnhancer('test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.namespace).to.equal('parent/test')
    })

    it('should use parent namespace if no namespace is provided', () => {
        const store = { unique: 'value', namespace: 'parent' }

        const subspace = {
            getState: sinon.spy(),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = namespaceEnhancer()(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.namespace).to.equal('parent')
    })

    it('should have no namespace if one is not provided and there is none to inherit', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.spy(),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = namespaceEnhancer()(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.namespace).to.equal('')
    })
})