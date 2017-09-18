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
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions('TEST')(store)(next)

        middleware({ type: 'TEST', value: 'expected' })

        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST', value: 'expected', globalAction: true })
        expect(next).to.not.be.called
    })

    it('should make actions global', () => {
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions('TEST_1', 'TEST_2')(store)(next)

        middleware({ type: 'TEST_1', value: 'expected 1' })
        middleware({ type: 'TEST_2', value: 'expected 2' })

        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST_1', value: 'expected 1', globalAction: true })
        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST_2', value: 'expected 2', globalAction: true })
        expect(next).to.not.be.called
    })

    it('should match regex', () => {
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions(/TEST_.*/)(store)(next)

        middleware({ type: 'TEST_1', value: 'expected 1' })
        middleware({ type: 'TEST_2', value: 'expected 2' })
        middleware({ type: 'TEST', value: 'expected' })

        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST_1', value: 'expected 1', globalAction: true })
        expect(store.dispatch).to.be.calledWithMatch({ type: 'TEST_2', value: 'expected 2', globalAction: true })
        expect(next).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })

    it('should ignore actions with different action type', () => {
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions('A_TEST')(store)(next)

        middleware({ type: 'NOT_A_TEST', value: 'expected' })
        middleware({ type: 'TEST', value: 'expected' })

        expect(next).to.be.calledWithMatch({ type: 'NOT_A_TEST', value: 'expected' })
        expect(next).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
        expect(store.dispatch).to.not.be.called
    })

    it('should ignore actions without a type', () => {
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions('TEST')(store)(next)

        const action = () => ({ type: 'TEST', value: 'expected' })

        middleware(action)

        expect(next).to.be.calledWith(action)
        expect(store.dispatch).to.not.be.called
    })

    it('should ignore already global actions', () => {
        const store = {
            dispatch: sinon.spy()
        }

        const next = sinon.spy()

        const middleware = globalActions('TEST')(store)(next)

        const action = () => ({ type: 'TEST', value: 'expected', globalAction: true })

        middleware(action)

        expect(next).to.be.calledWith(action)
        expect(store.dispatch).to.not.be.called
    })
})