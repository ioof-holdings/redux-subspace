# `namespacedAction(namespace)`

A higher-order action that adds the provided namespace to the action.

## Arguments

1. `namespace` (_string_): The namespace to apply to the action.

## Returns

(_Function_): A function that accepts an action and returns a new action that is identical to the original except with the namespace applied.

## Examples

```javascript
import { namespacedAction } from 'redux-subspace'

const action = namespacedAction('subApp')({ type: 'MY_ACTION', value: 'example' })
```
