import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { App, reducer } from './app'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('content')
)