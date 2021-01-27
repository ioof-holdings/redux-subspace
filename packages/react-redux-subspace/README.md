# react-redux-subspace

## Deprecated

**This library is no longer being actively maintained.**

IOOF has been slowly moving away from the ubiquitous use of Redux as a core piece of our micro-frontend architecture and have been actively replacing
the usage of this library with more standard React and JavaScript patterns.  Due to some technical constraints, we've also been unable to upgrade to
the latest version of the library ourselves for quite some time now, further fuelling our desire to move away from this solution.

At this time, we will be ceasing all maintenance tasks and we recommend that you consider using an alternative library:

* [`redux-doghouse`](https://www.npmjs.com/package/redux-doghouse)
* [`redux-fractal`](https://www.npmjs.com/package/redux-fractal)
* [`lean-redux`](https://www.npmjs.com/package/lean-redux)
* [`redux-react-local`](https://www.npmjs.com/package/redux-react-local)
* [`multireducer`](https://www.npmjs.com/package/multireducer)

If you want to continue using this library, we encourage you to fork this repo and take over maintenance yourself.

---

[![npm version](https://img.shields.io/npm/v/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/react-redux-subspace.svg?style=flat-square)](/LICENSE.md)

This is an extension for [redux-subspace](/) to create subspaces for Redux connected React components. It's designed to work with the `Provider` component from the [react-redux](https://github.com/reactjs/react-redux) bindings.

## Installation

```sh
npm install --save react redux react-redux redux-subspace react-redux-subspace
```

## Quick Start

```javascript
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { namespaced } from 'redux-subspace'
import { SubspaceProvider } from 'react-redux-subspace'
import { TodoApp, todoReducer } from './todoApp'
import { CounterApp, counterReducer } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const store = createStore(rootReducer)

const App = () => (
  <Provider store={store}>
    <SubspaceProvider mapState={(state) => state.todo}>
      <TodoApp />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.counter1} namespace="counter1">
      <CounterApp />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.counter2} namespace="counter2">
      <CounterApp />
    </SubspaceProvider>
  </Provider>
)
```

## Documentation

* [Usage](https://ioof-holdings.github.io/redux-subspace/packages/react-redux-subspace/docs/Usage.html)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html#react-redux-subspace)
* [API Reference](https://ioof-holdings.github.io/redux-subspace/packages/react-redux-subspace/docs/api/)
