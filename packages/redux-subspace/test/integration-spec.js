/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import { 
    subspace,
    applyMiddleware,
    namespaced,
    namespacedAction,
    globalAction,
    globalActions
} from '../src'

describe('integration tests', () => {

    const TEST_ACTION = 'TEST_ACTION'
    const TEST_GLOBAL_ACTION = 'TEST_GLOBAL_ACTION'

    const testAction = (value) => ({ type: TEST_ACTION, value })
    const testGlobalAction = (value) => ({ type: TEST_GLOBAL_ACTION, value })

    const childReducer = (state = 'initial value', action) => {
        switch (action.type) {
            case TEST_ACTION: 
            case TEST_GLOBAL_ACTION: 
                return action.value
            default:
                return state
        }
    }

    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const testMiddleware = (getStateSpy, dispatchSpy) => (store) => ({
        getState: (next) => () => {
            getStateSpy(store, next)
            return next()
        },
        dispatch: (next) => (action) => {
            dispatchSpy(store, next, action)
            return next(action)
        }
    })

    const storeMatcher = sinon.match.has('getState', sinon.match.func)
        .and(sinon.match.has('dispatch', sinon.match.func))

    const subspaceMatcher = storeMatcher.and(sinon.match.has('rootStore', storeMatcher))
        .and(sinon.match.has('namespace', sinon.match.string))

    describe('no subspaces', () => {
        it('should create store with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

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

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
        })
    })

    describe('no namespace single subspace', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent1)(rootStore)

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            expect(parentStore.getState()).to.deep.equal({
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(parentStore.getState()).to.deep.equal({
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('parent value'))
        })
    })

    describe('no namespace nested subspaces', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('root value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('parent value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'child value',
                child2: 'initial value'
            })
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

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('root value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('parent value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'child value',
                child2: 'initial value'
            })
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

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('parent value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('child value'))
        })
    })

    describe('namespace single subspace', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            expect(parentStore.getState()).to.deep.equal({
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(parentStore.getState()).to.deep.equal({
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('parentNamespace')(testAction('parent value')))
        })
    })

    describe('namespace nested subspaces', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'child value'
            })
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

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'child value'
            })
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

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('parentNamespace')(testAction('parent value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('parentNamespace/childNamespace')(testAction('child value')))
        })
    })

    describe('no namespace/namespace nested subspaces', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'child value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'parent value',
                    child2: 'child value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })
        })

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'root value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'child value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'parent value',
                    child2: 'child value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('parent value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('childNamespace')(testAction('child value')))
        })
    })

    describe('namespace/no namespace nested subspaces', () => {

        it('should create subspace', () => {
            const rootStore = createStore(rootReducer)

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('parent value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'child value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'child value',
                    child2: 'initial value'
                }
            })
        })

        it('should create subspace with middleware', () => {
            const getStateSpy = sinon.spy()
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(testMiddleware(getStateSpy, dispatchSpy)))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'initial value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'initial value',
                    child2: 'initial value'
                }
            })

            rootStore.dispatch(testAction('root value'))

            expect(childStore.getState()).to.equal('initial value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'initial value',
                child2: 'initial value'
            })
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

            parentStore.dispatch(testAction('parent value'))

            expect(childStore.getState()).to.equal('parent value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'parent value',
                child2: 'initial value'
            })
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

            childStore.dispatch(testAction('child value'))

            expect(childStore.getState()).to.equal('child value')
            expect(parentStore.getState()).to.deep.equal({ 
                child1: 'child value',
                child2: 'initial value'
            })
            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'initial value'
                },
                parent2: {
                    child1: 'child value',
                    child2: 'initial value'
                }
            })

            expect(getStateSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func)
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, testAction('root value'))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('parentNamespace')(testAction('parent value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, namespacedAction('parentNamespace')(testAction('child value')))
        })
    })

    describe('global actions', () => {
        it('should handle global actions from the root store', () => {
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(
                globalActions(TEST_GLOBAL_ACTION),
                testMiddleware(sinon.spy(), dispatchSpy),
            ))

            rootStore.dispatch(globalAction(testAction('global value')))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'global value',
                    child2: 'global value'
                },
                parent2: {
                    child1: 'global value',
                    child2: 'global value'
                }
            })


            rootStore.dispatch(testGlobalAction('root value'))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'root value'
                },
                parent2: {
                    child1: 'root value',
                    child2: 'root value'
                }
            })

            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testAction('global value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testGlobalAction('root value')))
        })

        it('should handle global actions from a parent subspace', () => {
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(
                globalActions(TEST_GLOBAL_ACTION),
                testMiddleware(sinon.spy(), dispatchSpy),
            ))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            parentStore.dispatch(globalAction(testAction('global value')))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'global value',
                    child2: 'global value'
                },
                parent2: {
                    child1: 'global value',
                    child2: 'global value'
                }
            })


            parentStore.dispatch(testGlobalAction('root value'))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'root value'
                },
                parent2: {
                    child1: 'root value',
                    child2: 'root value'
                }
            })

            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testAction('global value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testGlobalAction('root value')))
        })

        it('should handle global actions from a child subspace', () => {
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(
                globalActions(TEST_GLOBAL_ACTION),
                testMiddleware(sinon.spy(), dispatchSpy),
            ))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child1)(parentStore)

            childStore.dispatch(globalAction(testAction('global value')))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'global value',
                    child2: 'global value'
                },
                parent2: {
                    child1: 'global value',
                    child2: 'global value'
                }
            })


            childStore.dispatch(testGlobalAction('root value'))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'root value'
                },
                parent2: {
                    child1: 'root value',
                    child2: 'root value'
                }
            })

            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testAction('global value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testGlobalAction('root value')))
        })

        it('should handle global actions from a namespaced parent subspace', () => {
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(
                globalActions(TEST_GLOBAL_ACTION),
                testMiddleware(sinon.spy(), dispatchSpy),
            ))

            const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

            parentStore.dispatch(globalAction(testAction('global value')))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'global value',
                    child2: 'global value'
                },
                parent2: {
                    child1: 'global value',
                    child2: 'global value'
                }
            })


            parentStore.dispatch(testGlobalAction('root value'))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'root value'
                },
                parent2: {
                    child1: 'root value',
                    child2: 'root value'
                }
            })

            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testAction('global value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testGlobalAction('root value')))
        })

        it('should handle global actions from a namespace child subspace', () => {
            const dispatchSpy = sinon.spy()

            const rootStore = createStore(rootReducer, applyMiddleware(
                globalActions(TEST_GLOBAL_ACTION),
                testMiddleware(sinon.spy(), dispatchSpy),
            ))

            const parentStore = subspace((state) => state.parent1)(rootStore)

            const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

            childStore.dispatch(globalAction(testAction('global value')))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'global value',
                    child2: 'global value'
                },
                parent2: {
                    child1: 'global value',
                    child2: 'global value'
                }
            })


            childStore.dispatch(testGlobalAction('root value'))

            expect(rootStore.getState()).to.deep.equal({
                parent1: {
                    child1: 'root value',
                    child2: 'root value'
                },
                parent2: {
                    child1: 'root value',
                    child2: 'root value'
                }
            })

            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testAction('global value')))
            expect(dispatchSpy).to.have.been.calledWithMatch(subspaceMatcher, sinon.match.func, globalAction(testGlobalAction('root value')))
        })
    })
})
