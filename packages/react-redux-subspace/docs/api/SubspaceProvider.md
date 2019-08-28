# `<SubspaceProvider mapState namespace>`

A [`react-redux`](https://github.com/reactjs/react-redux) compatible [React component](https://facebook.github.io/react/docs/components-and-props.html) that creates a [subspace](/packages/redux-subspace/docs/api/subspace.md) store for any children of it..

## Props

1. `mapState` (_Function|string_): A [selector to derive the state](/docs/basics/CreatingSubspaces.md) of the subspace. The selector is provided the parent state as the first parameter and the root state as the second parameter. If passed as a string, a selector is created for that key on the provided state.
2. `namespace` (_string_): An optional [namespace to scope actions](/docs/basics/Namespacing.md) with.
3. `options` (_Object_): An optional object to supply the following options:
   - `context` (_React.Context|Object_): Override the React Context used for accessing the store. An object can be passed with separate `parent` and `child` contexts if required.

If `mapState` is passed as a string and no `namespace` is provided, the provided string is used for both. To prevent this, pass `null` as the `namespace` prop.

## Examples

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState={(state) => state.subApp}>
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState={(state, rootState) => ({ ...state.subApp, root: rootState })}>
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState={(state) => state.subApp} namespace="subApp">
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState="subApp" namespace="subAppNamespace">
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState="subApp">
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

const CustomReduxContext = React.createContext()

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider mapState={(state) => state.subApp} namespace="subApp" context={CustomReduxContext}>
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import AComponent from 'somewhere'

const CustomParentContext = React.createContext()
const CustomChildContext = React.createContext()

class MyComponent extends React.Component {
  render() {
    return (
      <SubspaceProvider
        mapState={(state) => state.subApp}
        namespace="subApp"
        context={{ parent: CustomParentContext, child: CustomChildContext }}
      >
        <AComponent />
      </SubspaceProvider>
    )
  }
}
```
