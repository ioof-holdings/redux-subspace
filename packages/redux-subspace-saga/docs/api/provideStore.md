# `provideStore(store)`

A higher-order saga that injects the provided store into the saga's context.

## Arguments

1. `store` (_Object_): An object that conforms to the [Redux store API](http://redux.js.org/docs/api/Store.html). Generally, this will be the root Redux store of the application, but it could also be a subspace if required.

2. `options` (_Object_): The [saga middleware options](https://redux-saga.js.org/docs/api/#runsagaoptions-saga-args) to pass to use when running subpsaced sagas.

## Returns

(_Function_): A function that accepts a saga (generator function) and returns a new saga that injects the store into the saga's context before executing the orignal saga.

## Examples

```javascript
import { provideStore } from 'redux-subspace-saga'
import { store, saga } from 'somewhere'

const wrappedSaga = provideStore(store)(saga)
```
