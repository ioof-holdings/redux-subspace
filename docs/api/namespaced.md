# `namespaced(namespace)`

A higher-order reducer that filters out actions that do not match the provided namespace.

## Arguments

1. `namespace` (_string_): The namespace of the reducer.

## Returns

(_Function_): A function that accepts a reducer and returns reducer that wraps the provided one.

## Examples

```javascript
import { namespaced } from 'redux-subspace'
import reducer from 'somewhere'

const namespacedReducer = namespace('subApp')(reducer)
```
