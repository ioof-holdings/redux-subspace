# redux-subspace-wormhole

[![npm version](https://img.shields.io/npm/v/redux-subspace-wormhole.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-wormhole)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-wormhole.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-wormhole)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace-wormhole.svg?style=flat-square)](/LICENSE.md)

This is [redux-subspace](/) middleware that injects additional global state into the subspace's state.

## Installation

```sh
npm install --save redux redux-subspace redux-subspace-wormhole
```

## Quick Start

```javascript
import { createStore, combineReducers } from 'redux'
import { namespaced, applyMiddleware } from 'redux-subspace'
import wormhole from 'redux-subspace-wormhole'
import { todoReducer } from './todoApp'
import { counterReducer } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const store = createStore(rootReducer, applyMiddleware(
    wormhole((state) => state.globalValue, 'globalValue')
))
```

## Documentation

* [Usage](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-wormhole/docs/Usage.html)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html#general-examples)
* [API Reference](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-wormhole/docs/api/)
