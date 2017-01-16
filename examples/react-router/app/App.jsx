import React from 'react'
import { Link } from 'react-router'
import { subspaced } from '../../../lib'
import { Component } from '../component'

const SubspacedComponent = subspaced(state => state.component)(Component)

const App = props => {
    return (
        <div>
            <h2>React Router - {props.route.title}</h2>
            <SubspacedComponent />
            <br />
            <Link to={props.location.pathname == "/" ? "/other" : "/"}>Try other route</Link>
        </div>
    )
}

export default App