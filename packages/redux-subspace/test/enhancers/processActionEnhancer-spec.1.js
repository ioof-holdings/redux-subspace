/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import processActionEnhancer from '../../src/enhancers/processActionEnhancer'

describe('processActionEnhancer tests', () => {

    it('should enhance subspace with transformAction function', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ parent: { child: { value: 'expected' } } }),
            dispatch: sinon.spy(),
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = processActionEnhancer('test')(createSubspace)(store)

        expect(enhancedSubspace.getState).to.equal(subspace.getState)
        expect(enhancedSubspace.dispatch).to.equal(subspace.dispatch)
        expect(enhancedSubspace.processAction).to.be.a('function')
    })
})