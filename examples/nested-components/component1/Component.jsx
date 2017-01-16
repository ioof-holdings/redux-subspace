import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { Component as SubComponent } from '../component2'

const Component = () => {
  return (
    <SubspaceProvider mapState={state => state.component}>
        <SubComponent />
    </SubspaceProvider>
  )
}

export default Component
