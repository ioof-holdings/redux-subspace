import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component } from '../component'

const App = () => {
    return (
        <div>
            <h2>Single Component</h2>
            <SubspaceProvider mapState={state => state.component}>
                <Component />
            </SubspaceProvider>
        </div>
    )
}

export default App