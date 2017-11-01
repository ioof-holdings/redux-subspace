/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import namespacedAction from '../../src/actions/namespacedAction'

describe('namespacedAction tests', () => {
    it('should namespaced action', () => {
        const action = { type: 'TEST', value: 'expected' }

        expect(namespacedAction('test')(action)).to.deep.equal({ type: 'test/TEST', value: 'expected' })
    })

    it('should ignore actions without a type', () => {
        const action = () => ({ type: 'TEST', value: 'expected' })

        expect(namespacedAction('test')(action)).to.equal(action)
    })
})