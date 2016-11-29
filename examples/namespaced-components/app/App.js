import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component } from '../component'

export default props => {
    return (
        <div>
            <h2>Namespaced Components</h2>
            <SubspaceProvider mapState={state => state.component1} namespace="component1">
                <Component />
            </SubspaceProvider>
            <SubspaceProvider mapState={state => state.component2} namespace="component2">
                <Component />
            </SubspaceProvider>
        </div>
    )
}
