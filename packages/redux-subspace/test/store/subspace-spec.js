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

    describe('getState Tests', () => {

        it('should wrap store getState', () => {
            const subspacedStore = subspace((state) => state.child)(store)

            expect(subspacedStore.getState()).to.equal("expected")
        })

        it('should use namespace if mapState not provided', () => {
            const subspacedStore = subspace(undefined, "child")(store)

            expect(subspacedStore.getState()).to.equal("expected")
        })
    })

    describe('dispatch Tests', () => {        
       
        it('should wrap store dispatch', () => {
            const subspacedStore = subspace((state) => state.child)(store)

            subspacedStore.dispatch({ type: "TEST" })

            expect(dispatch).to.have.been.calledWithMatch({ type: "TEST" })
        })

        it('should wrap store dispatch with namespace', () => {
            const subspacedStore = subspace((state) => state.child, "test")(store)

            subspacedStore.dispatch({ type: "TEST" })

            expect(dispatch).to.have.been.calledWithMatch({ type: "test/TEST" })
        })

        it('should allow namespace to be be first parameter', () => {
            const subspacedStore = subspace("child")(store)

            subspacedStore.dispatch({ type: "TEST" })

            expect(subspacedStore.getState()).to.equal("expected")
            expect(dispatch).to.have.been.calledWithMatch({ type: "child/TEST" })
        })
    })

    it('should raise error if neither mapState or namespace are provided', () => {
        expect(() => subspace()(store))
            .to.throw('mapState and/or namespace must be defined.')
    })

    it('should not raise error if neither mapState or namespace are provided in production', () => {
        let nodeEnv = process.env.NODE_ENV

        try {
            process.env.NODE_ENV = 'production'

            let subspacedStore = subspace()(store)

            expect(subspacedStore).to.not.be.undefined
        } finally {
            process.env.NODE_ENV = nodeEnv
        }
    })
})
