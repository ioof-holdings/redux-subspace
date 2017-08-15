/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { SubspaceProvider } from '../../../src'

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class RootState {
    parent: ParentState
}

const TestComponent = () => {
    return (
        <SubspaceProvider mapState={(state: ParentState) => state.child}>
            <p>test</p>
        </SubspaceProvider>
    )
}

const TestNamespacedComponent = () => {
    return (
        <SubspaceProvider namespace="testNamespace">
            <p>test</p>
        </SubspaceProvider>
    )
}

const TestSubspacedComponent = () => {
    return (
        <SubspaceProvider mapState={(state: ParentState) => state.child} namespace="testNamespace">
            <p>test</p>
        </SubspaceProvider>
    )
}

const TestComponentWithRootState = () => {
    return (
        <SubspaceProvider mapState={(state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent })}>
            <p>test</p>
        </SubspaceProvider>
    )
}

const TestSubspacedComponentWithRootState = () => {
    return (
        <SubspaceProvider mapState={(state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent })} namespace="testNamespace">
            <p>test</p>
        </SubspaceProvider>
    )
}
