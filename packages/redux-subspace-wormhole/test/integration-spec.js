/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import { subspace, applyMiddleware } from 'redux-subspace'
import wormhole from '../src'

describe('integration tests', () => {

    const childReducer = (state = { value: 'expected' }) => state
    const parentReducer = combineReducers({ child: childReducer })
    const rootReducer = combineReducers({ parent: parentReducer })

    it('should work with no subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(wormhole((state) => state.parent, 'fromWormhole')))

        expect(rootStore.getState()).to.deep.equal({
            parent: {
                child: {
                    value: 'expected'
                }
            },
            fromWormhole: {
                child: {
                    value: 'expected'
                }
            }
        })
    })

    it('should work with no namespace sigle subspace', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(wormhole((state) => state.parent, 'fromWormhole')))

        const parentStore = subspace((state) => state.parent)(rootStore)

        expect(parentStore.getState()).to.deep.equal({
            child: {
                value: 'expected'
            },
            fromWormhole: {
                child: {
                    value: 'expected'
                }
            }
        })
    })

    it('should work with no namespace nested subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(wormhole((state) => state.parent, 'fromWormhole')))

        const parentStore = subspace((state) => state.parent)(rootStore)

        const childStore = subspace((state) => state.child)(parentStore)

        expect(childStore.getState()).to.deep.equal({
            value: 'expected',
            fromWormhole: {
                child: {
                    value: 'expected'
                }
            }
        })
    })

    it('should work with namespaced sigle subspace', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(wormhole((state) => state.parent, 'fromWormhole')))

        const parentStore = subspace((state) => state.parent, 'parentNamespace')(rootStore)

        expect(parentStore.getState()).to.deep.equal({
            child: {
                value: 'expected'
            },
            fromWormhole: {
                child: { 
                    value: 'expected' 
                }
            }
        })
    })

    it('should work with namespaced nested subspaces', () => {
        const rootStore = createStore(rootReducer, applyMiddleware(wormhole((state) => state.parent, 'fromWormhole')))

        const parentStore = subspace((state) => state.parent, 'parentNamespace')(rootStore)

        const childStore = subspace((state) => state.child, 'childNamespace')(parentStore)

        expect(childStore.getState()).to.deep.equal({
            value: 'expected',
            fromWormhole: {
                child: { 
                    value: 'expected' 
                }
            }
        })
    })
})
