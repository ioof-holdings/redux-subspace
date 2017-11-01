import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { SubspaceProvider } from 'react-redux-subspace'
import { install, combineReducers } from 'redux-loop';
import { namespaced } from 'redux-subspace-loop'
import { CounterApp, reducer as counterReducer } from './counter';

/**
 * Namespace the counter reducers
 */
const reducer = combineReducers({
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

/**
 * Mount the counter app multiple times inside subspaces
 */
const App = () => (
  <div>
    <SubspaceProvider mapState={(state) => state.counter1} namespace="counter1">
      <CounterApp />
    </SubspaceProvider>
    <hr />
    <SubspaceProvider mapState={(state) => state.counter2} namespace="counter2">
      <CounterApp />
    </SubspaceProvider>
  </div>
)

/**
 * Setting up the store is as easy as using any other enhancer, like
 * `applyMiddleware` or `DevTools.instrument()`. We can also pass any sort of
 * object, like an `Immutable.Map` as our initial state.
 */
const store = install()(createStore)(reducer)

/**
 * Make some magic!
 */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
