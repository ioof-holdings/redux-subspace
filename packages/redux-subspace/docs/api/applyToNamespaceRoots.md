# `applyToNamespaceRoots(middleware)`

A higher-order middleware that ensures the provided middleware is applied to any subspace that is a namespace boundary, i.e. explicilty defines a namespace when the subspace is created.

## Arguments

1. `middleware` (_Function_): Function that conforms to the [Redux middleware API](http://redux.js.org/docs/api/applyMiddleware.html#arguments) or [Redux Subspaces middleware API]((/docs/advanced/middleware/CustomMiddleware.md)

## Returns

(_Function_): A Redux Subspace middleware that applies the middleware to any subspace that is a namespace boundary.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToNamespaceRoots } from 'redux-subspace'
import { reducer, middleware } from 'somewhere'

const store = createStore(reducer, applyMiddleware(applyToNamespaceRoots(middleware)))
```
