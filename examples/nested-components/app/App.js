import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component } from '../component1'

export default props => {
    return (
        <div>
            <h2>Nested Components</h2>
            <SubspaceProvider mapState={state => state.component}>
                <Component />
            </SubspaceProvider>
        </div>
    )
}
