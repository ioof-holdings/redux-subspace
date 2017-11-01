# `globalAction(action)`

A higher-order action that marks the action as a global action, i.e. wont be namespaced when dispatched from subspaces.

## Arguments

1. `action` (_Object_): The [action](http://redux.js.org/docs/Glossary.html#action) to make global.

## Returns

(_Object_): An action that is identical to the original except marked as a global action.

## Examples

```javascript
import { globalAction } from 'redux-subspace'

const action = globalAction({ type: 'MY_ACTION', value: 'example' })
```
