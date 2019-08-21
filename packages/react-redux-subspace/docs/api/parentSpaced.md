# `parentSpaced`

A [higher-order React component](https://facebook.github.io/react/docs/higher-order-components.html) that wraps a component in a [`ParentSpaceProvider`](/packages/react-redux-subspace/docs/api/ParentSpaceProvider.md).

## Arguments

1. `options` (_Object_): An optional object to supply the following options:
   - `context` (_React.Context|Object_): Override the React Context used for accessing the store. An object can be passed with separate `parent` and `child` contexts if required.

## Returns

(_Function_): A function that takes a React Component and returns it wrapped in a `ParentSpaceProvider`.

## Examples

```javascript
import { parentSpaced } from "react-redux-subspace"
import AComponent from "somewhere"

const MyComponent = parentSpaced()(AComponent)
```

```javascript
import React from "react"
import { parentSpaced } from "react-redux-subspace"
import AComponent from "somewhere"

const CustomReduxContext = React.createContext()

const MyComponent = parentSpaced({
  context: CustomReduxContext
})(AComponent)
```

```javascript
import React from 'react'
import { parentSpaced } from "react-redux-subspace"
import AComponent from "somewhere"

const CustomParentContext = React.createContext()
const CustomChildContext = React.createContext()

const MyComponent = parentSpaced({
  context: { parent: CustomParentContext, child: CustomChildContext }
})(AComponent)
```
