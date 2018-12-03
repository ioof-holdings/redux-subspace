import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Root, configureStore } from './root'

const history = createBrowserHistory()
const store = configureStore(history)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
