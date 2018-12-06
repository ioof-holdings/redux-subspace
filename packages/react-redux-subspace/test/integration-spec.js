/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { createStore, combineReducers } from 'redux'
import { namespaced } from 'redux-subspace/packages/redux-subspace'
import { Provider, connect } from 'react-redux'
import { mount } from 'enzyme'

import { SubspaceProvider } from '../src'

describe('integration tests', () => {

    const TEST_ACTION = 'TEST_ACTION'

    const testAction = (value) => {
        return ({ type: TEST_ACTION, value })
    }

    const childReducer = (state = 'initial value', action) => action.type === TEST_ACTION ? action.value : state
    const parentReducer = combineReducers({ child1: childReducer, child2: namespaced('childNamespace')(childReducer) })
    const rootReducer = combineReducers({ parent1: parentReducer, parent2: namespaced('parentNamespace')(parentReducer) })

    const makeContainer = (TestComponent) => connect(
        (state) => typeof state === 'string' ? { value: state } : state, 
        (dispatch, ownProps) => ({ testAction: () => dispatch(testAction(ownProps.actionValue)) })
    )(TestComponent)

    it('should work with no namespace single subspace', () => {

        const store = createStore(rootReducer)

        const ParentComponent = ({ child1, child2, testAction }) => (
            <div id='parent'>
                <p id='child1'>{child1}</p>
                <p id='child2'>{child2}</p>
                <button id='parent-action' onClick={testAction}>test action</button>
            </div>
        )

        const ParentContainer = makeContainer(ParentComponent)

        const RootComponent = ({ parent1, parent2, testAction }) => (
            <div>
                <p id='parent1-child1'>{parent1.child1}</p>
                <p id='parent1-child2'>{parent1.child2}</p>
                <p id='parent2-child1'>{parent2.child1}</p>
                <p id='parent2-child2'>{parent2.child2}</p>
                <SubspaceProvider mapState={state => state.parent1}>
                    <ParentContainer actionValue='parent value' />
                </SubspaceProvider>
                <button id='root-action' onClick={testAction}>test action</button>
            </div>
        )

        const RootContainer = makeContainer(RootComponent)

        let testComponent = mount(
            <Provider store={store}>
                <RootContainer actionValue='root value' />
            </Provider>
        )

        expect(testComponent.find('#parent1-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#root-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('root value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#parent-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')
    })

    it('should work with no namespace nested subspaces', () => {

        const store = createStore(rootReducer)

        const ChildComponent = ({ value, testAction }) => (
            <div id='child'>
                <p id='value'>{value}</p>
                <button id='child-action' onClick={testAction}>test action</button>
            </div>
        )

        const ChildContainer = makeContainer(ChildComponent)

        const ParentComponent = ({ child1, child2, testAction }) => (
            <div id='parent'>
                <p id='child1'>{child1}</p>
                <p id='child2'>{child2}</p>
                <SubspaceProvider mapState={state => state.child1}>
                    <ChildContainer actionValue='child value' />
                </SubspaceProvider>
                <button id='parent-action' onClick={testAction}>test action</button>
            </div>
        )

        const ParentContainer = makeContainer(ParentComponent)

        const RootComponent = ({ parent1, parent2, testAction }) => (
            <div>
                <p id='parent1-child1'>{parent1.child1}</p>
                <p id='parent1-child2'>{parent1.child2}</p>
                <p id='parent2-child1'>{parent2.child1}</p>
                <p id='parent2-child2'>{parent2.child2}</p>
                <SubspaceProvider mapState={state => state.parent1}>
                    <ParentContainer actionValue='parent value' />
                </SubspaceProvider>
                <button id='root-action' onClick={testAction}>test action</button>
            </div>
        )

        const RootContainer = makeContainer(RootComponent)

        let testComponent = mount(
            <Provider store={store}>
                <RootContainer actionValue='root value' />
            </Provider>
        )

        expect(testComponent.find('#parent1-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('initial value')

        testComponent.find('#root-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('root value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('root value')

        testComponent.find('#parent-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('parent value')

        testComponent.find('#child-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('child value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('child value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('child value')
    })

    it('should work with namespaced single subspace', () => {

        const store = createStore(rootReducer)

        const ParentComponent = ({ child1, child2, testAction }) => (
            <div id='parent'>
                <p id='child1'>{child1}</p>
                <p id='child2'>{child2}</p>
                <button id='parent-action' onClick={testAction}>test action</button>
            </div>
        )

        const ParentContainer = makeContainer(ParentComponent)

        const RootComponent = ({ parent1, parent2, testAction }) => (
            <div>
                <p id='parent1-child1'>{parent1.child1}</p>
                <p id='parent1-child2'>{parent1.child2}</p>
                <p id='parent2-child1'>{parent2.child1}</p>
                <p id='parent2-child2'>{parent2.child2}</p>
                <SubspaceProvider mapState={state => state.parent2} namespace='parentNamespace'>
                    <ParentContainer actionValue='parent value' />
                </SubspaceProvider>
                <button id='root-action' onClick={testAction}>test action</button>
            </div>
        )

        const RootContainer = makeContainer(RootComponent)

        let testComponent = mount(
            <Provider store={store}>
                <RootContainer actionValue='root value' />
            </Provider>
        )

        expect(testComponent.find('#parent1-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#root-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#parent-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')
    })

    it('should work with namespaced nested subspace', () => {

        const store = createStore(rootReducer)

        const ChildComponent = ({ value, testAction }) => (
            <div id='child'>
                <p id='value'>{value}</p>
                <button id='child-action' onClick={testAction}>test action</button>
            </div>
        )

        const ChildContainer = makeContainer(ChildComponent)

        const ParentComponent = ({ child1, child2, testAction }) => (
            <div id='parent'>
                <p id='child1'>{child1}</p>
                <p id='child2'>{child2}</p>
                <SubspaceProvider mapState={state => state.child2} namespace='childNamespace'>
                    <ChildContainer actionValue='child value' />
                </SubspaceProvider>
                <button id='parent-action' onClick={testAction}>test action</button>
            </div>
        )

        const ParentContainer = makeContainer(ParentComponent)

        const RootComponent = ({ parent1, parent2, testAction }) => (
            <div>
                <p id='parent1-child1'>{parent1.child1}</p>
                <p id='parent1-child2'>{parent1.child2}</p>
                <p id='parent2-child1'>{parent2.child1}</p>
                <p id='parent2-child2'>{parent2.child2}</p>
                <SubspaceProvider mapState={state => state.parent2} namespace='parentNamespace'>
                    <ParentContainer actionValue='parent value' />
                </SubspaceProvider>
                <button id='root-action' onClick={testAction}>test action</button>
            </div>
        )

        const RootContainer = makeContainer(RootComponent)

        let testComponent = mount(
            <Provider store={store}>
                <RootContainer actionValue='root value' />
            </Provider>
        )

        expect(testComponent.find('#parent1-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('initial value')

        testComponent.find('#root-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('initial value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#parent-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('initial value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('initial value')

        testComponent.find('#child-action').simulate('click')

        expect(testComponent.find('#parent1-child1').text()).to.equal('root value')
        expect(testComponent.find('#parent1-child2').text()).to.equal('initial value')
        expect(testComponent.find('#parent2-child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent2-child2').text()).to.equal('child value')

        expect(testComponent.find('#parent').find('#child1').text()).to.equal('parent value')
        expect(testComponent.find('#parent').find('#child2').text()).to.equal('child value')

        expect(testComponent.find('#parent').find('#child').find('#value').text()).to.equal('child value')
    })
})