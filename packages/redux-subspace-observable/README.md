# redux-subspace-observable

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

[![npm version](https://img.shields.io/npm/v/redux-subspace-observable.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-observable)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace-observable.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace-observable)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace-observable.svg?style=flat-square)](/LICENSE.md)

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

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducer, applyMiddleware())

epicMiddleware.run(rootEpic)
```

## Documentation

* [Usage](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-observable/docs/Usage.html)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html#redux-subspace-observable)
* [API Reference](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace-observable/docs/api/)
