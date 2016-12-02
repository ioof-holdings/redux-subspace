import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { App, reducer } from './app'

const store = createStore(reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('content')
)