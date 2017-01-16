import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component } from '../component'
import { ResetButton } from '../resetButton'

const App = () => {
    return (
        <div>
            <h2>Global Actions</h2>
            <SubspaceProvider mapState={state => state.component1} namespace="component1">
                <Component />
            </SubspaceProvider>
            <SubspaceProvider mapState={state => state.component2} namespace="component2">
                <Component />
            </SubspaceProvider>
            <SubspaceProvider mapState={state => state}>
                <ResetButton />
            </SubspaceProvider>
        </div>
    )
}

export default App