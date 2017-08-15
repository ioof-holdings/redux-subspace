# `createSagaMiddleware([options])`

A function that creates the redux-saga middleware as a Redux Subspace middleware.

## Arguments

1. `options` (_Object_): A list of options to pass to the middleware. These are simply passed through to the underlying `redux-saga` `createSagaMiddleware` function, so refer to [their documentation for supported options](https://redux-saga.js.org/docs/api/#createsagamiddlewareoptions).

## Returns

(_Function_): The middleware.

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import { reducer, saga } from 'somewhere'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)
```
