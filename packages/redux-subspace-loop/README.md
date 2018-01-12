# redux-subspace-loop

[![npm version](https://img.shields.io/npm/v/redux-subspace-loop.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-loop)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-loop.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-loop)
[![License: MIT](https://img.shields.io/npm/l/redux-subspace-loop.svg?style=flat-square)](/LICENSE.md)

This library provides necessary utilities for supporting redux-subspace in projects using [redux-loop](https://github.com/redux-loop/redux-loop).

## Installation

```sh
npm install --save redux redux-loop redux-subspace redux-subspace-loop
```

## Quick Start

```javascript
import { createStore } from 'redux'
import { subspace } from 'redux-subspace'
import { install, combineReducers } from 'redux-loop'
import { namespaced } from 'redux-subspace-loop'
import { todoReducer, addTodo } from './todoApp'
import { counterReducer, increment, decrement } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const store = createStore(rootReducer, install())

const todoStore = subspace((state) => state.todo)
const counter1Store = subspace((state) => state.counter1, 'counter1')
const counter2Store = subspace((state) => state.counter2, 'counter2')

todoStore.dispatch(addTodo('Use redux-subspace!'))
const todoState = todoStore.getState()

counter1Store.dispatch(increment())
const counter1State = counter1Store.getState()

counter2Store.dispatch(decrement())
const counter2State = counter2Store.getState()

const rootState = store.getState()
```

## Documentation

* [Usage](/packages/redux-subspace-loop/docs/Usage.md)
* [Examples](/docs/Examples.md#redux-subspace-loop)
* [API Reference](/packages/redux-subspace-loop/docs/api/README.md)
