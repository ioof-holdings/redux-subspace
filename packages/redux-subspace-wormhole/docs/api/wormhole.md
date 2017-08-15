# `wormhole(mapState, key)`

## Arguments

1. `mapState` (_Function|string_): Selector function that selects the wormhole value. If passed as a string, a selector is created for that key on the provided state.
2. `key` (_string_): the key to add the selected state to in subspaces

If `mapState` is passed as a string and no `key` is provided, the provided string is used for both.

## Returns

(_Function_): The Redux Subspace middleware

## Examples

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import wormhole from 'redux-subspace-wormhole'
import { reducer } from 'somewhere'

const store = createStore(reducer, applyMiddleware(wormhole((state) => state.value, 'value')))
```
