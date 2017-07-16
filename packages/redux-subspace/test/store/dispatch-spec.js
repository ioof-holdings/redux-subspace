/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { subStateDispatch } from '../../src/store/dispatch'

describe('dispatch Tests', () => {
    describe('subStateDispatch no namespace', () => {
        it('should forward standard action to dispatch', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { type: "testAction" }
            subStateDispatch(dispatch, () => state)(action)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction" })
        })
    })

    describe('subStateDispatch with namespaced', () => {
        it('should wrap dispatch in namespace', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { type: "testAction" }
            subStateDispatch(dispatch, () => state, 'customNamespace')(action)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction" })
        })

        it('should not modify unknown namespaced action formats', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { value: "I have no type!" }
            subStateDispatch(dispatch, () => state, 'customNamespace')(action)

            expect(dispatch).to.have.been.calledWith(action)
        })
    })
})
