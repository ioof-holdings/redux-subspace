# `parentSpaced`

A [higher-order React component](https://facebook.github.io/react/docs/higher-order-components.html) that wraps a component in a [`ParentSpaceProvider`](/packages/react-redux-subspace/docs/api/ParentSpaceProvider.md).

## Arguments

1. `component` (_ReactComponent_): A component which belongs to the parent space

## Returns

(_Function_): `component` wrapped in a `ParentSpaceProvider`.

## Examples

```javascript
import { parentSpaced } from 'react-redux-subspace'
import AComponent from 'somewhere'

const UnsubspacedComponent =  parentSpaced(AComponent)
```
