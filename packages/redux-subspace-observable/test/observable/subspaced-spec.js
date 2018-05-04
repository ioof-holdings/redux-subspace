/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureStore from 'redux-mock-store'
import { ofType } from 'redux-observable'
import { globalAction, namespacedAction } from 'redux-subspace'
import { mapTo } from 'rxjs/operators'
import { createEpicMiddleware, subspaced } from '../../src'

describe('subspaced Tests', () => {

    it('should throw error when not using subspace createEpicMiddleware', () => {
        const epic = actions$ => actions$.pipe(
            ofType('PING'),
            mapTo({ type: 'PONG' }))

        expect(
            subspaced(state => state)(epic)
        ).to.throw('Subspace epic couldn\'t find the store. Make sure you\'ve used createEpicMiddleware from redux-subspace-observable')
    })

    it('should get substate for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.pipe(
            ofType('TEST'),
            mapTo({ type: 'VERIFY', value: store.getState().value }))

        const subspacedEpic = subspaced(state => state.subState)(epic)

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic)])(state)

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

        const epic = (actions$, store) => actions$.pipe(
            ofType('TEST'),
            mapTo({ type: 'VERIFY', value: store.getState().value }))

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic)])(state)

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

        const epic = (actions$, store) => actions$.pipe(
            ofType('TEST'),
            mapTo({ type: 'VERIFY', value: store.getState().value }))

        const subspacedEpic = subspaced("subState")(epic)

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic)])(state)

        mockStore.dispatch(namespacedAction('subState')({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "subState/TEST" },
            { type: "subState/VERIFY", value: "expected" }
        ])
    })

    it('should accept global actions for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.pipe(
            ofType('TEST'),
            mapTo({ type: 'VERIFY', value: store.getState().value }))

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic)])(state)

        mockStore.dispatch(globalAction({ type: 'TEST' }))

        expect(mockStore.getActions()).to.deep.equal([
            { type: "TEST", globalAction: true },
            { type: "test/VERIFY", value: "expected" }
        ])
    })

    it('should not namespace global actions for epic', () => {
        
        const state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        const epic = (actions$, store) => actions$.pipe(
            ofType('TEST'),
            mapTo(globalAction({ type: 'VERIFY', value: store.getState().value })))

        const subspacedEpic = subspaced(state => state.subState, "test")(epic)

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic)])(state)

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

        const epic = (actions$, store, dependency) => actions$.pipe(
            ofType('TEST'),
            mapTo({ type: 'VERIFY', value: dependency.value }))

        const subspacedEpic = subspaced(state => state.subState)(epic)

        const dependencies = { value: 'expected' }

        const mockStore = configureStore([createEpicMiddleware(subspacedEpic, { dependencies })])(state)

        mockStore.dispatch({ type: 'TEST' })

        expect(mockStore.getActions()).to.deep.equal([
            { type: "TEST" },
            { type: "VERIFY", value: "expected" }
        ])
    })
})
