/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise'
import { subspace, applyMiddleware, namespaced } from '../../../src'

describe('redux-promise', () => {

    const TEST_ACTION = 'TEST_ACTION'

    const testAction = (payload) => ({ type: TEST_ACTION, payload })

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.payload : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    it('should work with no subspaces', (done) => {
        const rootStore = createStore(rootReducer, applyMiddleware(promiseMiddleware))

        const rootPromise = Promise.resolve('root value')

        rootStore.dispatch(testAction(rootPromise))
        
        rootPromise.then(() => {
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

            done()
        })
    })

    it('should work with no namespace single subspace', (done) => {
        const rootStore = createStore(rootReducer, applyMiddleware(promiseMiddleware))

        const parentStore = subspace((state) => state.parent1)(rootStore)

        const rootPromise = Promise.resolve('root value')
        
        rootStore.dispatch(testAction(rootPromise))
        
        rootPromise.then(() => {
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

            const parentPromise = Promise.resolve('parent value')
            
            parentStore.dispatch(testAction(parentPromise))
            
            parentPromise.then(() => {
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

                done()
            })
        })
    })

    it('should work with no namespace nested subspaces', (done) => {
        const rootStore = createStore(rootReducer, applyMiddleware(promiseMiddleware))

        const parentStore = subspace((state) => state.parent1)(rootStore)

        const childStore = subspace((state) => state.child1)(parentStore)

        const rootPromise = Promise.resolve('root value')
        
        rootStore.dispatch(testAction(rootPromise))
        
        rootPromise.then(() => {
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

            const parentPromise = Promise.resolve('parent value')
            
            parentStore.dispatch(testAction(parentPromise))
            
            parentPromise.then(() => {
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
                
                const childPromise = Promise.resolve(testAction('child value'))
                
                childStore.dispatch(childPromise)
                
                childPromise.then(() => {
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

                    done()
                })
            })
        })
    })

    it('should work with namespaced single subspace', (done) => {
        const rootStore = createStore(rootReducer, applyMiddleware(promiseMiddleware))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        const rootPromise = Promise.resolve('root value')
        
        rootStore.dispatch(testAction(rootPromise))
        
        rootPromise.then(() => {
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

            const parentPromise = Promise.resolve('parent value')
            
            parentStore.dispatch(testAction(parentPromise))
            
            parentPromise.then(() => {
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

                done()
            })
        })
    })

    it('should work with namespaced nested subspaces', (done) => {
        const rootStore = createStore(rootReducer, applyMiddleware(promiseMiddleware))

        const parentStore = subspace((state) => state.parent2, 'parentNamespace')(rootStore)

        const childStore = subspace((state) => state.child2, 'childNamespace')(parentStore)

        const rootPromise = Promise.resolve('root value')
        
        rootStore.dispatch(testAction(rootPromise))
        
        rootPromise.then(() => {
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

            const parentPromise = Promise.resolve('parent value')
            
            parentStore.dispatch(testAction(parentPromise))
            
            parentPromise.then(() => {
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
                
                const childPromise = Promise.resolve(testAction('child value'))
                
                childStore.dispatch(childPromise)
                
                childPromise.then(() => {
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

                    done()
                })
            })
        })
    })
})
