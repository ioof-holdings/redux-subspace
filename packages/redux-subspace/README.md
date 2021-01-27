# redux-subspace

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

[![npm version](https://img.shields.io/npm/v/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace.svg?style=flat-square)](/LICENSE.md)

This is a library to help build decoupled, componentized [Redux](http://redux.js.org/) apps that share a single global store. This is the core package of [redux-subspace](/)

## Installation

```sh
npm install --save redux redux-subspace
```

## Quick Start

```javascript
import { createStore, combineReducers } from 'redux'
import { subspace, namespaced } from 'redux-subspace'
import { todoReducer, addTodo } from './todoApp'
import { counterReducer, increment, decrement } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const store = createStore(rootReducer)

const todoStore = subspace((state) => state.todo)(store)
const counter1Store = subspace((state) => state.counter1, 'counter1')(store)
const counter2Store = subspace((state) => state.counter2, 'counter2')(store)

todoStore.dispatch(addTodo('Use redux-subspace!'))
const todoState = todoStore.getState()

counter1Store.dispatch(increment())
const counter1State = counter1Store.getState()

counter2Store.dispatch(decrement())
const counter2State = counter2Store.getState()

const rootState = store.getState()
```

## Documentation

* [Usage](https://ioof-holdings.github.io/redux-subspace/docs/basics/CreatingSubspaces.html)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html#redux-subspace)
* [API Reference](https://ioof-holdings.github.io/redux-subspace/packages/redux-subspace/docs/api/)

The full documentation for Redux Subspace can be found [here](https://ioof-holdings.github.io/redux-subspace/).
