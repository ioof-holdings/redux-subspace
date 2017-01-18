import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, routerReducer, syncHistoryWithStore, LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux'
import { subspaced, namespaced, GlobalActions } from '../../lib'
import { App, reducer } from './app'

GlobalActions
    .register(LOCATION_CHANGE)
    .register(CALL_HISTORY_METHOD)

const reducers = combineReducers({
    routing: routerReducer,
    app1: namespaced(reducer, 'app1'),
    app2: namespaced(reducer, 'app2')
})

const store = createStore(reducers, compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={subspaced(state => state.app1, 'app1')(App)} title="Index" />
            <Route path="other" component={subspaced(state => state.app2, 'app2')(App)} title="Other" />
        </Router>
    </Provider>,
    document.getElementById('content')
)