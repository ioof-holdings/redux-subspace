/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import namespaced from '../../src/reducers/namespaced'

describe('namespaced Tests', () => {

    const initialState = "initial state"
    const testReducer = (state = initialState, action) => {
        switch (action.type) {
            case "CHANGE_STATE":
                return action.newValue
            default:
                return state
        }
    }
    const wrappedReducer = namespaced("testing")(testReducer)

    it('should get initial state from wrapped reducer', () => {
        let action = { type: "INIT" }
        let newState = wrappedReducer(undefined, action)
        expect(newState).to.equal('initial state')
    })

    it('should ignore action without provided namespace', () => {
        let action = { type: "CHANGE_STATE", newValue: "new state" }
        let newState = wrappedReducer(initialState, action)
        expect(newState).to.equal('initial state')
    })

    it('should forward action with provided namespace', () => {
        let action = { type: "testing/CHANGE_STATE", newValue: "new state" }
        let newState = wrappedReducer(initialState, action)
        expect(newState).to.equal('new state')
    })

    it('should forward global actions', () => {
        let action = { type: "CHANGE_STATE", newValue: "new state", globalAction: true }
        let newState = wrappedReducer(initialState, action)
        expect(newState).to.equal('new state')
    })
})