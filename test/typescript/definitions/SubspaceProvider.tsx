import * as React from 'react'
import { SubspaceProvider } from '../../../src'

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
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