# `applyMiddleware(...middleware)`

A replacement for [Redux's `applyMiddleware` store enhancer](http://redux.js.org/docs/api/applyMiddleware.html) that applies the middleware to the store and subspaces created from it.  It also supports [Redux Subspace specific middleware](/docs/advanced/middleware/CustomMiddleware.md).

## Arguments

1. `...middleware` (_arguments_): Functions that conform to the [Redux middleware API](http://redux.js.org/docs/api/applyMiddleware.html#arguments) or [Redux Subspaces middleware API]((/docs/advanced/middleware/CustomMiddleware.md).

## Returns

(_Function_): A store enhancer that applies the given middleware.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import { reducer, middleware } from 'somewhere'

const store = createStore(reducer, applyMiddleware(middleware))
```
