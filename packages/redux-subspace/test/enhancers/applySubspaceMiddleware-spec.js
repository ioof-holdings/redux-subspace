/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applySubspaceMiddleware from '../../src/enhancers/applySubspaceMiddleware'

describe('applySubspaceMiddleware tests', () => {

    it('should enhance getState with middleware', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware = (store) => ({
            getState: (next) => () => {
                const state = next()
                middlewareSpy(store, state)
                return state
            }
        })
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware)(createSubspace)(store)

        expect(enhancedSubspace.getState()).to.deep.equal({ value: 'expected' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { value: 'expected' })
    })

    it('should enhance getState with multiple middlewares', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware1 = (store) => ({
            getState: (next) => () => {
                const state = next()
                middlewareSpy(store, state)
                return state
            }
        })

        const middleware2 = (store) => ({
            getState: (next) => () => {
                const state = next()
                middlewareSpy(store, state)
                return { value: 'new value' }
            }
        })
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware1, middleware2)(createSubspace)(store)

        expect(enhancedSubspace.getState()).to.deep.equal({ value: 'new value' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { value: 'expected' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { value: 'new value' })
    })

    it('should enhance dispatch with middleware', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware = (store) => ({
            dispatch: (next) => (action) => {
                middlewareSpy(store, action)
                return next(action)
            }
        })
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware)(createSubspace)(store)

        enhancedSubspace.dispatch({ type: 'TEST' })

        expect(subspace.dispatch).to.be.calledWithMatch({ type: 'TEST' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { type: 'TEST' })
    })

    it('should enhance dispatch with multiple middlewares', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware1 = (store) => ({
            dispatch: (next) => (action) => {
                middlewareSpy(store, action)
                return next({ type: 'NEW_TYPE' })
            }
        })

        const middleware2 = (store) => ({
            dispatch: (next) => (action) => {
                middlewareSpy(store, action)
                return next(action)
            }
        })
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware1, middleware2)(createSubspace)(store)

        enhancedSubspace.dispatch({ type: 'TEST' })

        expect(subspace.dispatch).to.be.calledWithMatch({ type: 'NEW_TYPE' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { type: 'TEST' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { type: 'NEW_TYPE' })
    })

    it('should treat redux style middleware as dispatch middleware', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware = (store) => (next) => (action) => {
            middlewareSpy(store, action)
            return next(action)
        }
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware)(createSubspace)(store)

        enhancedSubspace.dispatch({ type: 'TEST' })

        expect(subspace.dispatch).to.be.calledWithMatch({ type: 'TEST' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { type: 'TEST' })
    })

    it('should enhance getState and dispatch with middleware', () => {
        const store = { unique: 'value' }

        const subspace = {
            getState: sinon.stub().returns({ value: 'expected' }),
            dispatch: sinon.spy()
        }

        const middlewareSpy = sinon.spy()

        const middleware = (store) => ({
            getState: (next) => () => {
                const state = next()
                middlewareSpy(store, state)
                return state
            },
            dispatch: (next) => (action) => {
                middlewareSpy(store, action)
                return next(action)
            }
        })
    
        const createSubspace = sinon.mock().withArgs(store).returns(subspace)

        const enhancedSubspace = applySubspaceMiddleware(middleware)(createSubspace)(store)

        enhancedSubspace.dispatch({ type: 'TEST' })

        expect(enhancedSubspace.getState()).to.deep.equal({ value: 'expected' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { value: 'expected' })
        expect(middlewareSpy).to.be.calledWithMatch(subspace, { type: 'TEST' })
    })
})