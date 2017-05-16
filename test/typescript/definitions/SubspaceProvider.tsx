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

const TestNamepsacedComponent = () => {
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

const TestNamepsacedComponentWithRootState = () => {
    return (
        <SubspaceProvider mapState={(state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent })} namespace="testNamespace">
            <p>test</p>
        </SubspaceProvider>
    )
}