/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import { subspace, applyMiddleware, namespaced } from 'redux-subspace'
import { combineEpics } from 'redux-observable'
import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { of } from 'rxjs/observable/of'
import { createEpicMiddleware, subspaced } from '../src'
import { merge } from 'rxjs/observable/merge';

describe('integration tests', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'

    const TEST_ACTION = 'TEST_ACTION'

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const checkingEpic = (action$) => action$.ofType(TEST_ACTION_TRIGGER)
        ::map(action => ({ type: TEST_ACTION, value: action.value }))

    it('should not throw error when dependencies is undefined/null/an object', () => {
        expect(() => {
            createEpicMiddleware(checkingEpic)
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, {})
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: undefined })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: null })
        }).not.to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: { foo: 'bar' } })
        }).not.to.throw(TypeError, 'dependencies must be an object')
    })

    it('should throw error when dependencies is not an object', () => {
        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: true })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: 5 })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: 'foo' })
        }).to.throw(TypeError, 'dependencies must be an object')

        expect(() => {
            createEpicMiddleware(checkingEpic, { dependencies: ['foo', 'bar'] })
        }).to.throw(TypeError, 'dependencies must be an object')
    })

    it('should work with no subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

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
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

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
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(checkingEpic)))

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
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(
            combineEpics(
                checkingEpic,
                subspaced((state) => state.parent2, 'parentNamespace')(checkingEpic)
            )
        )))

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
        const rootStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(
            combineEpics(
                checkingEpic,
                subspaced((state) => state.parent2, 'parentNamespace')(
                    combineEpics(
                        checkingEpic,
                        subspaced((state) => state.child2, 'childNamespace')(checkingEpic)
                    )
                )
            )
        )))

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

        let actions = [];

        const throwingEpic = (action$) =>
            action$.ofType(TEST_ACTION_TRIGGER)
                ::mergeMap(action => {throw new Error(`expected ${action.message}`);});

        const errorHandler = (epic) => (action$, store, deps) => {
            return epic(action$, store, deps)
                .catch((error, stream) => {
                    return merge(stream, of({ type: TEST_ACTION, message: error.message}));
            })
        };

        const rootStore = createStore(
            (s ,a) =>  {
                actions.push(a);
                return s || {};
            },
            applyMiddleware(createEpicMiddleware(
                errorHandler(
                    combineEpics(
                        throwingEpic,
                        subspaced((state) => state.parent2, 'parentNamespace')(throwingEpic)
                    )
                )
            )));

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        rootStore.dispatch({ type: TEST_ACTION_TRIGGER, message: 'root' });
        parentStore.dispatch({ type: TEST_ACTION_TRIGGER, message: 'parent' });

        expect(actions).to.deep.equal([ { type: '@@redux/INIT' },
            { type: TEST_ACTION_TRIGGER, message: 'root' },
            { type: TEST_ACTION, message: 'expected root' },
            { type: `parentNamespace/${TEST_ACTION_TRIGGER}`, message: 'parent' },
            { type: TEST_ACTION, message: 'expected parent'}]);
    })
})
