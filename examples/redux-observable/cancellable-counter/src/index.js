import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux-subspace'
import { SubspaceProvider } from 'react-redux-subspace'
import { createEpicMiddleware } from 'redux-subspace-observable'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import reducer from './reducers'
import { rootEpic } from './epic'
import Counter from './components/Counter'

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(epicMiddleware)
)

epicMiddleware.run(rootEpic)

render(
  <Provider store={store}>
    <div>
      <SubspaceProvider mapState={state => state.counter1} namespace="counter1" context={ReactReduxContext}>
        <Counter />
      </SubspaceProvider>
      <SubspaceProvider mapState={state => state.counter2} namespace="counter2" context={ReactReduxContext}>
        <Counter />
      </SubspaceProvider>
    </div>
  </Provider>,
  document.getElementById('root')
)
