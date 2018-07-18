/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, createStore } from 'redux'
import { combineEpics, ofType } from 'redux-observable'
import { applyMiddleware, namespaced, subspace } from 'redux-subspace'
import { merge, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { createEpicMiddleware, subspaced } from '../src'

describe('integration tests', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'

    const TEST_ACTION = 'TEST_ACTION'

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const checkingEpic = (action$) => action$.pipe(
        ofType(TEST_ACTION_TRIGGER),
        map(action => ({ type: TEST_ACTION, value: action.value })))

    it('should not throw error when dependencies is undefined/null/an object', () => {
        expect(() => {
            createEpicMiddleware()
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({})
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: undefined })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: null })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: { foo: 'bar' } })
        }).not.to.throw(TypeError, 'dependencies must be an object')
    })

    it('should throw error when dependencies is not an object', () => {
        expect(() => {
            createEpicMiddleware({ dependencies: true })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: 5 })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: 'foo' })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware({ dependencies: ['foo', 'bar'] })
        }).to.throw(TypeError, 'dependencies must be an object')
    })

    it('should work with no subspaces', () => {
        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(rootReducer, applyMiddleware(epicMiddleware))

        epicMiddleware.run(checkingEpic)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })
    })

    it('should work with no namespace single subspace', () => {
        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(rootReducer, applyMiddleware(epicMiddleware))

        epicMiddleware.run(checkingEpic)

        const parentStore = subspace((state) => state.parent1)(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'parent value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })
    })

    it('should work with no namespace nested subspaces', () => {
        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(rootReducer, applyMiddleware(epicMiddleware))

        epicMiddleware.run(checkingEpic)

        const parentStore = subspace((state) => state.parent1)(rootStore)

        const childStore = subspace((state) => state.child1)(parentStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'parent value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'child value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })
    })

    it('should work with namespaced single subspace', () => {
        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(rootReducer, applyMiddleware(epicMiddleware))
        const rootEpic = combineEpics(
            checkingEpic,
            subspaced((state) => state.parent2, 'parentNamespace')(checkingEpic))

        epicMiddleware.run(rootEpic)

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'initial value'
            }
        })
    })

    it('should work with namespaced nested subspaces', () => {
        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(rootReducer, applyMiddleware(epicMiddleware))
        const rootEpic = combineEpics(
            checkingEpic,
            subspaced((state) => state.parent2, 'parentNamespace')(
                combineEpics(
                    checkingEpic,
                    subspaced((state) => state.child2, 'childNamespace')(checkingEpic))))

        epicMiddleware.run(rootEpic)

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'initial value',
                child2: 'initial value'
            }
        })

        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'initial value'
            }
        })

        childStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'child value' })

        expect(rootStore.getState()).to.deep.equal({
            parent1: {
                child1: 'root value',
                child2: 'initial value'
            },
            parent2: {
                child1: 'parent value',
                child2: 'child value'
            }
        })
    })

    it('should allow error handling in root epic', () => {
        const actions = []

        const epicMiddleware = createEpicMiddleware()
        const rootStore = createStore(
            (s, a) => {
                actions.push(a)
                return rootReducer(s, a)
            },
            applyMiddleware(epicMiddleware))

        const throwingEpic = (action$) =>
            action$.pipe(
                ofType(TEST_ACTION_TRIGGER),
                mergeMap(action => { throw new Error(`expected ${action.value}`) }))

        const errorHandler = (epic) => (action$, state$, deps) => epic(action$, state$, deps).pipe(
            catchError((error, stream) => merge(stream, of({ type: TEST_ACTION, value: error.message }))))

        const rootEpic = errorHandler(
            combineEpics(
                throwingEpic,
                subspaced((state) => state.parent2, 'parentNamespace')(throwingEpic)))

        epicMiddleware.run(rootEpic)

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'root' })
        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, value: 'parent' })

        expect(actions.slice(1)).to.deep.equal([
            { type: TEST_ACTION_TRIGGER, value: 'root' },
            { type: TEST_ACTION, value: 'expected root' },
            { type: `parentNamespace/${TEST_ACTION_TRIGGER}`, value: 'parent' },
            { type: TEST_ACTION, value: 'expected parent' }])
    })
})
