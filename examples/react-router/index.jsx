import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, compose, combineReducers } from 'redux'
import { subspaced, namespaced } from '../../lib'
import { App, reducer } from './app'

const reducers = combineReducers({
    app1: namespaced(reducer, 'app1'),
    app2: namespaced(reducer, 'app2')
})

const store = createStore(reducers, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={subspaced(state => state.app1, 'app1')(App)} title="Index" />
            <Route path="other" component={subspaced(state => state.app2, 'app2')(App)} title="Other" />
        </Router>
    </Provider>,
    document.getElementById('content')
)