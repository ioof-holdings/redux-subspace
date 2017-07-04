import React from 'react'
import { connect } from 'react-redux'
import { readyToChangeValue } from './actions'

const Component = props => {
  return (
    <div>
      <div>{props.value} <button onClick={() => props.readyToChangeValue()}>Change It!</button></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    value: state.value
  }
}

const mapDispatchToProps = dispatch => {
  return {
    readyToChangeValue: () => dispatch(readyToChangeValue())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
