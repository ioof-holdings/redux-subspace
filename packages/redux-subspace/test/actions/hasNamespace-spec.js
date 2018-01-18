/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hasNamespace from '../../src/actions/hasNamespace'

describe('hasNamespace tests', () => {
    it('should identify namespace in action type', () => {
        const action = { type: 'test/TEST', value: 'expected' }

        expect(hasNamespace(action, 'test')).to.be.ok
    })

    it('should not identify namespace in action type', () => {
        const action = { type: 'TEST', value: 'expected' }

        expect(hasNamespace(action, 'test')).to.not.be.ok
    })

    it('should not identify namespace if there is no action type', () => {
        const action = () => ({ type: 'TEST', value: 'expected' })

        expect(hasNamespace(action, 'test')).to.not.be.ok
    })

    it('should not identify namespace if there is no action', () => {
        const action = undefined

        expect(hasNamespace(action, 'test')).to.not.be.ok
    })
})