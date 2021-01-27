# redux-subspace-saga

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

[![npm version](https://img.shields.io/npm/v/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-saga)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-saga)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace-saga.svg?style=flat-square)](/LICENSE.md)

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
