# `wormhole(mapState, key)`

## Arguments

1. `mapState` (_Function): Selector function that selects the wormhole value.
2. `key` (_string_): the key to add the selected state to in subspaces

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
