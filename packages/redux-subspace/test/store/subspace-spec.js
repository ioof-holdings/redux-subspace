/* Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import subspace from '../../src/store/subspace'

describe('subspace Tests', () => {

    const child = (state = "expected") => state
    const parentReducer = combineReducers({ child })
    const store = createStore(parentReducer)
    const dispatch = sinon.spy()
    store.dispatch = dispatch

    it('should wrap store', () => {
        const subspacedStore = subspace(store, (state) => state.child)

        subspacedStore.dispatch({ type: "TEST" })

        expect(subspacedStore.getState()).to.equal("expected")
        expect(dispatch).to.have.been.calledWithMatch({ type: "TEST" })
    })

    it('should wrap store with namespace', () => {
        const subspacedStore = subspace(store, (state) => state.child, "test")

        subspacedStore.dispatch({ type: "TEST" })

        expect(subspacedStore.getState()).to.equal("expected")
        expect(dispatch).to.have.been.calledWithMatch({ type: "test/TEST" })
    })
})