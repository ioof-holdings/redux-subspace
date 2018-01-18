/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import { mapTo } from 'rxjs/operator/mapTo'
import { namespacedAction, globalAction } from 'redux-subspace'
import subspaced from '../../src/observable/subspaced'

describe('subspaced Tests', () => {
    
    it('should get substate for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.ofType('TEST')
            ::mapTo({ type: 'VERIFY', value: store.getState().value })

        const subspacedEpic = subspaced(state => state.subState)(epic)

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { store } })(store)
        ])(state)

        mockStore.dispatch({ type: 'TEST' })

        expect(mockStore.getActions()).to.deep.equal([
            { type: "TEST" },
            { type: "VERIFY", value: "expected" }
        ])
    })

    it('should namespace actions for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.ofType('TEST')
            ::mapTo({ type: 'VERIFY', value: store.getState().value })

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { store } })(store)
        ])(state)

        mockStore.dispatch(namespacedAction('test')({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "test/TEST" },
            { type: "test/VERIFY", value: "expected" }
        ])
    })

    it('should use namespace for substate for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.ofType('TEST')
            ::mapTo({ type: 'VERIFY', value: store.getState().value })

        const subspacedEpic = subspaced("subState")(epic)

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { store } })(store)
        ])(state)

        mockStore.dispatch(namespacedAction('subState')({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "subState/TEST" },
            { type: "subState/VERIFY", value: "expected" }
        ])
    })

    it('should accept global actions for saga', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.ofType('TEST')
            ::mapTo({ type: 'VERIFY', value: store.getState().value })

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { store } })(store)
        ])(state)

        mockStore.dispatch(globalAction({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "TEST", globalAction: true },
            { type: "test/VERIFY", value: "expected" }
        ])
    })

    it('should not namespace global actions for saga', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.ofType('TEST')
            ::mapTo(globalAction({ type: 'VERIFY', value: store.getState().value }))

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { store } })(store)
        ])(state)

        mockStore.dispatch(namespacedAction('test')({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "test/TEST" },
            { type: "VERIFY", value: "expected", globalAction: true }
        ])
    })
    
    it('should pass on dependencies to epic', () => {
        
        const state = {
            subState: {
                value: "wrong"
            },
            value: "wrong"
        }

        const epic = (actions$, store, dependency) => actions$.ofType('TEST')
            ::mapTo({ type: 'VERIFY', value: dependency.value })

        const subspacedEpic = subspaced(state => state.subState)(epic)

        const dependencies = { value: 'expected' }

        const mockStore = configureStore([
            store => createEpicMiddleware(subspacedEpic, { dependencies: { ...dependencies, store } })(store)
        ])(state)

        mockStore.dispatch({ type: 'TEST' })

        expect(mockStore.getActions()).to.deep.equal([
            { type: "TEST" },
            { type: "VERIFY", value: "expected" }
        ])
    })
})
