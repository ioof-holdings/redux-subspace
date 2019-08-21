# `<ParentSpaceProvider>`

A [`react-redux`](https://github.com/reactjs/react-redux) compatible [React component](https://facebook.github.io/react/docs/components-and-props.html) that will allow its children to behave as if they were not inside the nearest enclosing [`<SubspaceProvider>`](/docs/api/SubspaceProvider.md).

## Props

1. `options` (_Object_): An optional object to supply the following options:
   - `context` (_React.Context|Object_): Override the React Context used for accessing the store. An object can be passed with separate `parent` and `child` contexts if required.

## Examples

React recommends using "render props" in certain situations to establish an inverted control between components. This can lead to trouble when the render props are passed to a subspaced component since any redux-connected components inside the render prop will find themselves inside a subspace that they do not wish to be in. Usually code inside a render prop is meant to execute in the environment exterior to the component with the prop.

```javascript
import React from `react`
import { ParentSpaceProvider } from 'react-redux-subspace'
import ApplicationRequiringParentScope from 'some-dependency'

class MyComponent extends React.Component {
  render() {
    return (
      <ParentSpaceProvider>
        <ApplicationRequiringParentScope />
      </ParentSpaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { ParentSpaceProvider } from 'react-redux-subspace'
import ApplicationRequiringParentScope from 'some-dependency'

const CustomContext = React.createContext()

class MyComponent extends React.Component {
  render() {
    return (
      <ParentSpaceProvider context={CustomContext}>
        <ApplicationRequiringParentScope />
      </ParentSpaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { ParentSpaceProvider } from 'react-redux-subspace'
import ApplicationRequiringParentScope from 'some-dependency'

const CustomParentContext = React.createContext()
const CustomChildContext = React.createContext()

class MyComponent extends React.Component {
  render() {
    return (
      <ParentSpaceProvider context={{ parent: CustomParentContext, child: CustomChildContext }}>
        <ApplicationRequiringParentScope />
      </ParentSpaceProvider>
    )
  }
}
```
