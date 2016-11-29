import React from 'react'
import { connect } from 'react-redux'
import { changeValue } from './actions'

const Component = props => {
  return (
    <div>
      <div>{props.value} <button onClick={() => props.changeValue()}>Change It!</button></div>
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
    changeValue: () => dispatch(changeValue())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
