import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { withStore } from '../../src'

import { App, reducer, sagas } from './app'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

sagaMiddleware.run(withStore(sagas, store));

render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('content')
)