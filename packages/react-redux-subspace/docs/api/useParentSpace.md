# `useParentSpace`

A [React hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) that returns the [parent space](/packages/redux-subspace/docs/api/parentSpace.md) for the current store context.

## Arguments

1. `options` (_Object_): An optional object to supply the following options:
   - `context` (_React.Context|Object_): Override the React Context used for accessing the store.

## Returns

(_Object_): The parent store, or the current store if the current store has no parent.

## Examples

```javascript
import React from 'react'
import { useParentSpace } from 'react-redux-subspace'

const MyComponent = () => {
  const parentSpace = useParentSpace()

  const { parentValue } = parentSpace.getState()
  return (
    <div>
      <p>{parentValue}</p>
      <button onClick={() => parentSpace.dispatch({ type: "PARENT_ACTION" })}></button>
    <div>
  )
}
```

```javascript
import React from 'react'
import { useParentSpace } from 'react-redux-subspace'

const CustomReduxContext = React.createContext()

const MyComponent = () => {
  const parentSpace = useParentSpace({ context: CustomReduxContext })

  const { parentValue } = parentSpace.getState()
  return (
    <div>
      <p>{parentValue}</p>
      <button onClick={() => parentSpace.dispatch({ type: "PARENT_ACTION" })}></button>
    <div>
  )
}
```