# `globalActions(...actionTypes)`

A Redux middleware that ensures the matching action types as will be raised as global actions.

## Arguments

1. `actionsTypes` (_arguments_): Strings or Patterns to match against dispatched action types.

## Returns

(_Function_): The middleware.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware, globalActions } from 'redux-subspace'
import reducer from 'somewhere'

const store = createStore(reducer, applyMiddleware(globalActions('ACTION_TYPE')))
```

```javascript
import { createStore } from 'redux'
import { applyMiddleware, globalActions } from 'redux-subspace'
import reducer from 'somewhere'

const store = createStore(reducer, applyMiddleware(globalActions('ACTION_TYPE_1', 'ACTION_TYPE_2')))
```

```javascript
import { createStore } from 'redux'
import { applyMiddleware, globalActions } from 'redux-subspace'
import reducer from 'somewhere'

const store = createStore(reducer, applyMiddleware(globalActions(/ACTION_.*/)))
```
