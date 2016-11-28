import React from 'react'
import { connect } from 'react-redux'
import { SubspaceProvider } from '../../src'
import { globalAction } from './actions'

const InnerComponent = props => {
    return (
        <div>
            <h3>Sub Level</h3>
            <SubspaceProvider mapState={state => state} namespace='global'>
                <div><button onClick={() => props.globalAction()}>Change Everything!</button></div>
            </SubspaceProvider>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        globalAction: () => dispatch(globalAction())
    }
}

const ConnectedInnerComponent = connect(state => { return {} }, mapDispatchToProps)(InnerComponent)

const Component = props => {
    return (
        <div>
            <h3>Top Level</h3>
            <div><button onClick={() => props.globalAction()}>Change Everything!</button></div>
            <ConnectedInnerComponent />
        </div>
    )
}

export default connect(state => { return {} }, mapDispatchToProps)(Component)