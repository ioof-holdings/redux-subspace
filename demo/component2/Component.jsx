import React from 'react'
import { SubspaceProvider } from '../../src'
import { Component as SubComponent } from '../component1'
import { Component as GlobalComponent } from '../component4'

export default props => {
    return (
        <div>
            <SubspaceProvider mapState={state => state.subComponent} namespace="test1">
                <SubComponent />
            </SubspaceProvider>
        </div>
    )
}