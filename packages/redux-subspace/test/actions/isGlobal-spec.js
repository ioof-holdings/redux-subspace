/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isGlobal from '../../src/actions/isGlobal'

describe('isGlobal tests', () => {
    it('should be global', () => {
        const action = { type: 'TEST', value: 'expected', globalAction: true }

        expect(isGlobal(action)).to.be.truthy
    })

    it('should not be global', () => {
        const action = { type: 'TEST', value: 'expected' }

        expect(isGlobal(action)).to.be.falsy
    })

    it('should not be global there is no action type', () => {
        const action = () => ({ type: 'TEST', value: 'expected' })

        expect(isGlobal(action)).to.be.falsy
    })
})