/* Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import subspace, { subspaceEnhanced } from '../../src/store/subspace'
import { ROOT, NAMESPACE_ROOT, CHILD } from '../../src/enhancers/subspaceTypeEnhancer'

describe('subspace Tests', () => {

    const child = (state = "expected") => state
    const parentReducer = combineReducers({ child })
    const store = createStore(parentReducer)
    const dispatch = sinon.spy()
    store.dispatch = dispatch

    it('should enhance store getState', () => {
        const subspacedStore = subspace((state) => state.child)(store)

        expect(subspacedStore.getState()).to.equal("expected")
    })

    it('should use namespace if mapState not provided', () => {
        const subspacedStore = subspace(undefined, "child")(store)

        expect(subspacedStore.getState()).to.equal("expected")
    })

    it('should not enhance store dispatch if no namespace provided', () => {
        const subspacedStore = subspace((state) => state.child)(store)

        subspacedStore.dispatch({ type: "TEST" })

        expect(dispatch).to.have.been.calledWithMatch({ type: "TEST" })
    })

    it('should enhance store dispatch with namespace', () => {
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

    it('should enhance subspace with enhancer', () => {
        const enhancer = (createSubspace) => (store) => {
            return {
                ...createSubspace(store),
                fromEnhancer: true
            }
        }

        const subspacedStore = subspaceEnhanced((state) => state.child, "test", { enhancer })(store)

        expect(subspacedStore.fromEnhancer).to.be.true
    })

    it('should allow enhancer to be second paramter', () => {
        const enhancer = (createSubspace) => (store) => {
            return {
                ...createSubspace(store),
                fromEnhancer: true
            }
        }

        const subspacedStore = subspaceEnhanced("child", { enhancer })(store)

        expect(subspacedStore.fromEnhancer).to.be.true
    })

    it('should enhance subspace from inherited enhancer', () => {
        const enhancer = (createSubspace) => (store) => {
            return {
                ...createSubspace(store),
                fromEnhancer: true
            }
        }

        const storeWithMiddleware = { ...store }
        storeWithMiddleware.dispatch = dispatch
        storeWithMiddleware.subspaceOptions = {
            enhancer
        }

        const subspacedStore = subspace((state) => state.child, "test")(storeWithMiddleware)

        expect(subspacedStore.fromEnhancer).to.be.true
    })

    it('should provide process action fuction on subspace', () => {
        const subspacedStore = subspace("child")(store)

        expect(subspacedStore.processAction).to.be.a('function')
    })

    it('should provide subspace type on subspace', () => {
        const subspacedStore1 = subspace("child1")(store)
        const subspacedStore2 = subspace(() => {})(store)
        const subspacedStore3 = subspace("child2")(subspacedStore1)
        const subspacedStore4 = subspace(() => {})(subspacedStore1)
        const subspacedStore5 = subspace(() => {})(subspacedStore3)
        const subspacedStore6 = subspace('child3')(subspacedStore3)
        const subspacedStore7 = subspace('child3')(subspacedStore4)
        const subspacedStore8 = subspace(() => {})(subspacedStore4)

        expect(subspacedStore1.subspaceType).to.equal(ROOT)
        expect(subspacedStore2.subspaceType).to.equal(ROOT)
        expect(subspacedStore3.subspaceType).to.equal(NAMESPACE_ROOT)
        expect(subspacedStore4.subspaceType).to.equal(CHILD)
        expect(subspacedStore5.subspaceType).to.equal(CHILD)
        expect(subspacedStore6.subspaceType).to.equal(NAMESPACE_ROOT)
        expect(subspacedStore7.subspaceType).to.equal(NAMESPACE_ROOT)
        expect(subspacedStore8.subspaceType).to.equal(CHILD)
    })

    it('should provide root store on subspace', () => {
        const subspacedStore1 = subspace("child1")(store)
        const subspacedStore2 = subspace("child2")(subspacedStore1)

        expect(subspacedStore1.rootStore).to.equal(store)
        expect(subspacedStore2.rootStore).to.equal(store)
    })

    it('should provide full namespace subspace', () => {
        const subspacedStore1 = subspace("child1")(store)
        const subspacedStore2 = subspace("child2")(subspacedStore1)

        expect(subspacedStore1.namespace).to.equal('child1')
        expect(subspacedStore2.namespace).to.equal('child1/child2')
    })

    it('should correctly apply namespace when not provided', () => {
        const subspacedStore1 = subspace(() => {})(store)
        const subspacedStore2 = subspace("child2")(subspacedStore1)
        const subspacedStore3 = subspace(() => {})(subspacedStore2)
        const subspacedStore4 = subspace("child4")(subspacedStore3)
        const subspacedStore5 = subspace(() => {})(subspacedStore4)

        expect(subspacedStore1.namespace).to.equal('')
        expect(subspacedStore2.namespace).to.equal('child2')
        expect(subspacedStore3.namespace).to.equal('child2')
        expect(subspacedStore4.namespace).to.equal('child2/child4')
        expect(subspacedStore5.namespace).to.equal('child2/child4')
    })

    it('should raise error if neither mapState or namespace are provided', () => {
        expect(() => subspace()(store)).to.throw('mapState and/or namespace must be defined.')
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

    it('should raise error if enhancer is not a function', () => {

        expect(() => subspaceEnhanced((state) => state.child, "child", { enhancer: "wrong" })(store))
            .to.throw('enhancer must be a function.')
    })

    it('should not raise error if enhancer is not a functionin production', () => {
        let nodeEnv = process.env.NODE_ENV

        try {
            process.env.NODE_ENV = 'production'

            let subspacedStore = subspaceEnhanced((state) => state.child, "child", { enhancer: "wrong" })(store)

            expect(subspacedStore).to.not.be.undefined
        } finally {
            process.env.NODE_ENV = nodeEnv
        }
    })
})
