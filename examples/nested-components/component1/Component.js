import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component as SubComponent } from '../component2'

const Component = props => {
  return (
    <SubspaceProvider mapState={state => state.component}>
        <SubComponent />
    </SubspaceProvider>
  )
}

export default Component
