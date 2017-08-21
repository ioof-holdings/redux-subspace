# `createEpicMiddleware(rootEpic, [options])`

A function that creates the redux-observable middleware as a Redux Subspace middleware.

## Arguments

1. `rootEpic` (_Function_): The root [Epic](https://redux-observable.js.org/docs/basics/Epics.html).
1. `options` (_Object_): A list of options to pass to the middleware. These are simply passed through to the underlying `redux-observable` `createEpicMiddleware` function, so refer to [their documentation for supported options](https://redux-observable.js.org/docs/api/createEpicMiddleware.html#arguments).

## Returns

(_Function_): The middleware.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import { createEpicMiddleware } from 'redux-subspace-observable'
import { reducer, epic } from 'somewhere'

const epicMiddleware = createEpicMiddleware(epic)

const store = createStore(reducer, applyMiddleware(epicMiddleware))
```
