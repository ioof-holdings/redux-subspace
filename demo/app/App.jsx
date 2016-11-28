import React from 'react'
import { SubspaceProvider } from '../../lib'
import { Component as SubComponent} from '../component1'
import { Component as MiddleComponent } from '../component2'
import { Component as ThunkComponent } from '../component3'
import { Component as GlobalComponent } from '../component4'

export default props => {
    return (
        <div>
            <h2>Basic Example</h2>
            <SubspaceProvider mapState={state => state.subComponent}>
                <SubComponent />
            </SubspaceProvider>

            <h2>Namespaced</h2>
            <SubspaceProvider mapState={state => state.namespacedComponent} namespace="namespaced">
                <SubComponent />
            </SubspaceProvider>

            <h2>Nested</h2>
            <SubspaceProvider mapState={state => state.middleComponent} namespace="middle">
                <MiddleComponent />
            </SubspaceProvider>

            <h2>Thunks</h2>
            <SubspaceProvider mapState={state => state.thunkComponent}>
                <ThunkComponent />
            </SubspaceProvider>

            <h2>Namespaced Thunks</h2>
            <SubspaceProvider mapState={state => state.namespacedThunkComponent} namespace="namespacedThunk">
                <ThunkComponent />
            </SubspaceProvider>

            <h2>Global Actions</h2>
            <GlobalComponent />
        </div>
    )
}
