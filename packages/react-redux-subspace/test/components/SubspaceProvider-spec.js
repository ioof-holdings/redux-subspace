/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from 'enzyme'

import SubspaceProvider from '../../src/components/SubspaceProvider'

describe('SubspaceProvider Tests', () => {

    const TestComponent = connect(state => { return { value: state.value } })(props => <p>{props.value}</p>)

    it('should render child component with substate', () => {
        let state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        let mockStore = configureStore()(state)

        let testComponent = render(
            <Provider store={mockStore}>
                <SubspaceProvider mapState={state => state.subState}>
                    <TestComponent />
                </SubspaceProvider>
            </Provider>
        )

        expect(testComponent.text()).to.equal("expected")
    })

    it('should render child component using namespace for substate', () => {
        let state = {
            subState: {
                value: "expected"
            },
            value: "wrong"
        }

        let mockStore = configureStore()(state)

        let testComponent = render(
            <Provider store={mockStore}>
                <SubspaceProvider namespace="subState">
                    <TestComponent />
                </SubspaceProvider>
            </Provider>
        )

        expect(testComponent.text()).to.equal("expected")
    })

    it('should render nested child component with substate', () => {
        let state = {
            subState: {
                subSubState: {
                    value: "expected"
                },
                value: "still wrong"
            },
            value: "wrong"
        }

        let mockStore = configureStore()(state)

        let testComponent = render(
            <Provider store={mockStore}>
                <SubspaceProvider mapState={state => state.subState}>
                    <SubspaceProvider mapState={state => state.subSubState}>
                        <TestComponent />
                    </SubspaceProvider>
                </SubspaceProvider>
            </Provider>
        )

        expect(testComponent.text()).to.equal("expected")
    })

    it('should render child component with substate using root state', () => {
        let state = {
            subState: {
                value: "expected 1"
            },
            value: "expected 2"
        }

        let mockStore = configureStore()(state)

        let testComponent = render(
            <Provider store={mockStore}>
                <SubspaceProvider mapState={(state, rootState) => ({ value: `${state.subState.value} - ${rootState.value}`})}>
                    <TestComponent />
                </SubspaceProvider>
            </Provider>
        )

        expect(testComponent.text()).to.equal("expected 1 - expected 2")
    })

    it('should render nested child component with substate using root state', () => {
        let state = {
            subState: {
                subSubState: {
                    value: "expected 1"
                },
                value: "wrong"
            },
            value: "expected 2"
        }

        let mockStore = configureStore()(state)

        let testComponent = render(
            <Provider store={mockStore}>
                <SubspaceProvider mapState={(state) => state.subState}>
                    <SubspaceProvider mapState={(state, rootState) => ({ value: `${state.subSubState.value} - ${rootState.value}`})}>
                        <TestComponent />
                    </SubspaceProvider>
                </SubspaceProvider>
            </Provider>
        )

        expect(testComponent.text()).to.equal("expected 1 - expected 2")
    })
})
