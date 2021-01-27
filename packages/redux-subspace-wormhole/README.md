# redux-subspace-wormhole

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
