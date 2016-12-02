import React from 'react'
import { connect } from 'react-redux'
import { reset } from './actions'

const ResetButton = props => {
  return (
    <button onClick={() => props.reset()}>Reset All</button>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset())
  }
}

export default connect(state => state, mapDispatchToProps)(ResetButton)
