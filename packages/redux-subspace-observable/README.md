# redux-subspace-observable

[![npm version](https://img.shields.io/npm/v/redux-subspace-observable.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-observable)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-observable.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-observable)
[![License: MIT](https://img.shields.io/npm/l/redux-subspace-observable.svg?style=flat-square)](/LICENSE.md)

This is an extension for [redux-subspace](/) to create subspaces for epics. It's designed to work with [redux-observable](https://redux-observable.js.org/) middleware.

## Installation

```sh
npm install --save redux redux-observable redux-subspace redux-subspace-observable
```

## Quick Start

```javascript
import { createStore, combineReducers } from 'redux'
import { namespaced, applyMiddleware } from 'redux-subspace'
import { createEpicMiddleware, subspaced } from 'redux-subspace-observable'
import { combineEpics } from 'redux-observable'
import { todoReducer, todoEpic } from './todoApp'
import { counterReducer, counterEpic } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const rootEpic = combineEpics(
  subspaced((state) => state.todo)(todoEpic),
  subspaced((state) => state.counter1, 'counter1')(counterEpic),
  subspaced((state) => state.counter2, 'counter2')(counterEpic)
)

const store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)))
```

## Documentation

* [Usage](/packages/redux-subspace-observable/docs/Usage.md)
* [Examples](/docs/Examples.md#redux-subspace-observable)
* [API Reference](/packages/redux-subspace-observable/docs/api/README.md)
