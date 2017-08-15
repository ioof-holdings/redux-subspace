/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import globalActions from '../../src/middleware/globalActions'

describe('globalActions tests', () => {
    it('should make action global', () => {
        const next = sinon.spy()

        const middleware = globalActions('TEST')()(next)

        middleware({ type: 'TEST', value: 'expected' })

        expect(next).to.be.calledWithMatch({ type: 'TEST', value: 'expected', globalAction: true })
    })

    it('should make actions global', () => {
        const next = sinon.spy()

        const middleware = globalActions('TEST_1', 'TEST_2')()(next)

        middleware({ type: 'TEST_1', value: 'expected 1' })
        middleware({ type: 'TEST_2', value: 'expected 2' })

        expect(next).to.be.calledWithMatch({ type: 'TEST_1', value: 'expected 1', globalAction: true })
        expect(next).to.be.calledWithMatch({ type: 'TEST_2', value: 'expected 2', globalAction: true })
    })

    it('should match regex', () => {
        const next = sinon.spy()

        const middleware = globalActions(/TEST_.*/)()(next)

        middleware({ type: 'TEST_1', value: 'expected 1' })
        middleware({ type: 'TEST_2', value: 'expected 2' })
        middleware({ type: 'TEST', value: 'expected' })

        expect(next).to.be.calledWithMatch({ type: 'TEST_1', value: 'expected 1', globalAction: true })
        expect(next).to.be.calledWithMatch({ type: 'TEST_2', value: 'expected 2', globalAction: true })
        expect(next).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })

    it('should ignore actions with differnt action type', () => {
        const next = sinon.spy()

        const middleware = globalActions('TEST')()(next)

        middleware({ type: 'NOT_TEST', value: 'expected' })

        expect(next).to.be.calledWithMatch({ type: 'NOT_TEST', value: 'expected' })
    })

    it('should ignore actions without a type', () => {
        const next = sinon.spy()

        const middleware = globalActions('TEST')()(next)

        const action = () => ({ type: 'TEST', value: 'expected' })

        middleware(action)

        expect(next).to.be.calledWith(action)
    })
})