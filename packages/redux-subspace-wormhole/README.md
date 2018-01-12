# redux-subspace-wormhole

[![npm version](https://img.shields.io/npm/v/redux-subspace-wormhole.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-wormhole)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-wormhole.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-wormhole)
[![License: MIT](https://img.shields.io/npm/l/redux-subspace-wormhole.svg?style=flat-square)](/LICENSE.md)

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

* [Usage](/packages/redux-subspace-wormhole/docs/Usage.md)
* [Examples](/docs/Examples.md#general-examples)
* [API Reference](/packages/redux-subspace-wormhole/docs/api/README.md)
