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

        expect(isGlobal(action)).to.be.ok
    })

    it('should not be global', () => {
        const action = { type: 'TEST', value: 'expected' }

        expect(isGlobal(action)).to.not.be.ok
    })

    it('should be global if there is no action type', () => {
        const action = () => ({ type: 'TEST', value: 'expected' })

        expect(isGlobal(action)).to.be.ok
    })

    it('should be global if it is a redux-specific action', () => {
        const type = '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.')

        const action = () => ({ type })

        expect(isGlobal(action)).to.be.ok
    })
})