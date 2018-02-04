# redux-subspace-saga

[![npm version](https://img.shields.io/npm/v/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-saga)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-saga)
[![License: MIT](https://img.shields.io/npm/l/redux-subspace-saga.svg?style=flat-square)](/LICENSE.md)

This is an extension for [redux-subspace](/) to create subspaces for sagas. It's designed to work with [redux-saga](https://redux-saga.js.org) middleware.

## Installation

```sh
npm install --save redux redux-saga redux-subspace redux-subspace-saga
```

## Quick Start

```javascript
import { createStore, combineReducers } from 'redux'
import { namespaced, applyMiddleware } from 'redux-subspace'
import createSagaMiddleware, { subspaced } from 'redux-subspace-saga'
import { all } from 'redux-saga/effects'
import { todoReducer, todoSaga } from './todoApp'
import { counterReducer, counterSaga } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const subspacedTodoSaga = subspaced((state) => state.todo)(todoSaga)
const subspacedCounter1Saga = subspaced((state) => state.counter1, 'counter1')(counterSaga)
const subspacedCounter2Saga = subspaced((state) => state.counter2, 'counter2')(counterSaga)

function* rootSaga() {
  yield all([
    subspacedTodoSaga(),
    subspacedCounter1Saga(),
    subspacedCounter2Saga()
  ])
}

sagaMiddleware.run(rootSaga)
```

## Documentation

* [Usage](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-saga/docs/Usage.html)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html#redux-subspace-saga)
* [API Reference](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-saga/docs/api/)
