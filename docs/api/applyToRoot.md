# `applyToRoot(middleware)`

A higher-order middleware that ensures the provided middleware is only applied to the root store.

## Arguments

1. `middleware` (_Function_): Function that conforms to the [Redux middleware API](http://redux.js.org/docs/api/applyMiddleware.html#arguments) or [Redux Subspaces middleware API]((/docs/advanced/middleware/CustomMiddleware.md)

## Returns

(_Function_): A Redux Subspace middleware that applies the middleware to the root store only.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToRoot } from 'redux-subspace'
import { reducer, middleware } from 'somewhere'

const store = createStore(reducer, applyMiddleware(applyToRoot(middleware)))
```
