# `applyToChildren(middleware)`

A higher-order middleware that ensures the provided middleware is applied to any subspace that is not the root store.

## Arguments

1. `middleware` (_Function_): Function that conforms to the [Redux middleware API](http://redux.js.org/docs/api/applyMiddleware.html#arguments) or [Redux Subspaces middlware API]((/docs/advanced/middleware/CustomMiddleware.md)

## Returns

(_Function_): A Redux Subspace middleware that applies the middleware to any subspace that is not the root store.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToChildren } from 'redux-subspace'
import { reducer, middlware } from 'somewhere'

const store = createStore(reducer, applyMiddleware(applyToChildren(middlware)))
```
