# react-redux-subspace

This is a library to create subspaces for Redux connected React components. It's designed to work with Provider from the [react-redux](https://github.com/reactjs/react-redux) bindings.

## What it does

For a Redux connected React component, `SubspaceProvider` allows you to present a sub-view of the state to the component, allowing it to be ignorant of parent state structure. This means you can reuse these components in multiple parts of your app, or even multiple applications that have different store structures.

Actions dispatched from sub-stores can be automatically namespaced to prevent them from being picked up by unrelated reducers that inadvertently use the same action types. Actions dispatched inside thunks executed by [redux-thunk](https://github.com/gaearon/redux-thunk) middleware will be automatically namespaced.

### Use this library if:

* You are using a single global Redux store, but would like to create decoupled Redux components.
* You want actions dispatched from these components to not be picked up by reducers in other components (i.e. avoid action cross talk).

## How to use

Wrap sub-component with provider

```javascript
import { SubspaceProvider } from 'react-redux-subspace'
import { SubComponent } from 'some-dependency'

...

<SubspaceProvider mapState={state => state.subComponent}>
    <SubComponent />
</SubspaceProvider>
```

The root state of the store is also provided as a second parameter to `mapState` as well.  This can be useful for accessing global in nested components (e.g. configuration).

```javascript
<SubspaceProvider mapState={(state, rootState) => ({ ...state.subComponent, configuration: rootState.configuration })>
    <SubComponent />
</SubspaceProvider>
```

### In sub-component

Export reducer

```javascript
const initialState = {
    value: "store value"
}

export default function reducer(state = initialState, action) {
    ...
    return state
}
```

Use in mapStateToProps

```javascript
const mapStateToProps = state => {
    return {
        value: state.value,
        parentValue: state.root.value
    }
}
```

An additional `root` node is added to the state which will reflect the root state.

#### Higher-Order Component

The `subspaced` HOC can be used to wrap components you do not want to directly wrap in `jsx`.  An [example](./examples/react-router/index.jsx) of when this might be useful is when setting `Route` components for `react-router`.

```javascript
import { subspaced } from 'react-redux-subspace'
import { SubComponent } from 'some-dependency'

const SubspacedSubComponent = subspaced(state => state.subComponent)(SubComponent)
```

### Namespacing

Namespacing sub-components allows multiple instances of the component to exist on the same page, without the actions affecting each other's state.

To namespace the sub-component both the provider and the reducer need to be namespaced by the parent component/app. The `type` of any dispatched namespaced actions will be in the format `givenNamespace/originalType`.

```javascript
import { SubspaceProvider } from 'react-redux-subspace'
import { SubComponent } from 'some-dependency'

...

<SubspaceProvider mapState={state => state.subComponent} namespace='myComponent'>
    <SubComponent />
</SubspaceProvider>
```

The `subspaced` HOC also supports namespacing.

```javascript
import { subspaced } from 'redux-subspace'
import { SubComponent } from 'some-dependency'

const SubspacedSubComponent = subspaced(state => state.subComponent, 'myComponent')(SubComponent)
```

### Nesting Subspaced Components

When nesting subspaced components, the `state` parameter of `mapState` will be relative to the parent substate, while the `rootState` parameter is relative to the root of the state tree. If namespacing, dispatched actions will be namespaced for each layer of subspaces they pass through.

## Examples

Examples can be found [here](./examples).
