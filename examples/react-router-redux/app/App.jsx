import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { subspaced } from '../../../lib'
import { Component } from '../component'

const SubspacedComponent = subspaced(state => state.component)(Component)

const App = props => {
    return (
        <div>
            <h2>React Router - {props.route.title}</h2>
            <SubspacedComponent />
            <br />
            <button onClick={() => props.linkTo(props.location.pathname == "/" ? "/other" : "/")}>Try other route</button>
        </div>
    )
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        linkTo: (path) => dispatch(push(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)