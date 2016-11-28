import React from 'react'
import { connect } from 'react-redux'
import { delayedChangeValue, nestedChangeValue } from './actions'

const Component = props => {
    return (
        <div>
            <h3>Single Thunk</h3>
            <div>{props.value} <button onClick={() => props.changeValue()}>Change It!</button></div>
            <h3>Nested Thunks</h3>
            <div>{props.thunkValues.value1} - {props.thunkValues.value2} <button onClick={() => props.nestedChangeValue()}>Change It!</button></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        value: state.value,
        thunkValues: state.thunkValues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeValue: () => dispatch(delayedChangeValue()),
        nestedChangeValue: () => dispatch(nestedChangeValue())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)