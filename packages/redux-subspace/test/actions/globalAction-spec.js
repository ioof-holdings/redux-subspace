/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import globalAction from '../../src/actions/globalAction'

describe('globalAction tests', () => {
    it('should make action global', () => {
        const action = { type: 'TEST', value: 'expected' }

        expect(globalAction(action)).to.deep.equal({ type: 'TEST', value: 'expected', globalAction: true })
    })

    it('should ignore actions without a type', () => {
        const action = () => ({ type: 'TEST', value: 'expected' })

        expect(globalAction(action)).to.equal(action)
    })
})