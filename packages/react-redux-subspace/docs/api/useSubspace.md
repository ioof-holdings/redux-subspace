# `useSubspace`

A [React hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) that creates a [subspace](/packages/redux-subspace/docs/api/subspace.md) for the current store context.

## Arguments

1. `mapState` (_Function|string_): A [selector to derive the state](/docs/basics/CreatingSubspaces.md) of the subspace. The selector is provided the parent state as the first parameter and the root state as the second parameter. If passed as a string, a selector is created for that key on the provided state.
2. `namespace` (_string_): An optional [namespace to scope actions](/docs/basics/Namespacing.md) with.
3. `options` (_Object_): An optional object to supply the following options:
   - `context` (_React.Context|Object_): Override the React Context used for accessing the store.

If `mapState` is passed as a string and no `namespace` is provided, the provided string is used for both. To prevent this, pass `null` as the second parameter.

## Returns

(_Object_): The subspaced store.

## Examples

```javascript
import React, { useCallback } from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const MyComponent = () => {
  const mapState = useCallback((state) => state.subApp))
  const subspace = useSubspace(mapState)

  const { childValue } = subspace.getState()
  return (
    <div>
      <p>{childValue}</p>
      <button onClick={() => subspace.dispatch({ type: "CHILD_ACTION" })}></button>
    <div>
  )
}
```

```javascript
import React, { useCallback } from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const MyComponent = () => {
  const mapState = useCallback((state, rootState) => ({ ...state.subApp, root: rootState })))
  const subspace = useSubspace(mapState)

  const { rootValue } = subspace.getState().root
  return (
    <div>
      <p>{rootValue}</p>
    <div>
  )
}
```

```javascript
import React, { useCallback } from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const MyComponent = () => {
  const mapState = useCallback((state) => state.subApp))
  const subspace = useSubspace(mapState, "subApp")

  const { childValue } = subspace.getState()
  return (
    <div>
      <p>{childValue}</p>
      <button onClick={() => subspace.dispatch({ type: "CHILD_ACTION" })}></button>
    <div>
  )
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const MyComponent = () => {
  const subspace = useSubspace("subApp", "subAppNamespace")

  const { childValue } = subspace.getState()
  return (
    <div>
      <p>{childValue}</p>
      <button onClick={() => subspace.dispatch({ type: "CHILD_ACTION" })}></button>
    <div>
  )
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const MyComponent = () => {
  const subspace = useSubspace("subApp")

  const { childValue } = subspace.getState()
  return (
    <div>
      <p>{childValue}</p>
      <button onClick={() => subspace.dispatch({ type: "CHILD_ACTION" })}></button>
    <div>
  )
}
```

```javascript
import React, { useCallback } from `react`
import { SubspaceProvider } from 'react-redux-subspace'

const CustomReduxContext = React.createContext()

const MyComponent = () => {
  const mapState = useCallback((state) => state.subApp))
  const subspace = useSubspace(mapState, "subApp", { context: CustomReduxContext })

  const { childValue } = subspace.getState()
  return (
    <div>
      <p>{childValue}</p>
      <button onClick={() => subspace.dispatch({ type: "CHILD_ACTION" })}></button>
    <div>
  )
}
```