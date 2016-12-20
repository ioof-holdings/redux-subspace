/**
 * Copyright 2016, IOOF Holdings Limited.
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

        expect(testComponent.html()).to.equal("<p>expected</p>");
    })
})