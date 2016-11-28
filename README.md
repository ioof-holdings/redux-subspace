Redux Subspace Library
-----------------------

This is a library to create subspaces for Redux connected React components. It's designed to work with Provider from the [react-redux](https://github.com/reactjs/react-redux) bindings.

## What it does
For a Redux connected React component, SubspaceProvider allows you to present a sub-view of the state to the component, allowing it to be ignorant of parent state structure. This means you can reuse these components in multiple parts of your app, or even multiple applications that have different store structures.

Actions dispatched from components can be automatically namespaced to prevent them from being picked up by unrelated reducers that inadvertently use the same action types. Actions dispatched inside thunks executed by Redux-thunk middleware will be automatically namespaced.

Subspace works with global actions by specifying `global: true` in the action. Global actions will not be namespaced, allowing them to be picked up by other components' reducers.

## Use this library if...
  * You are using a single global Redux store, but would like to create decoupled and sharable Redux components.
  * You want actions dispatched from these components to not be picked up by reducers in other components (i.e. avoid action cross talk).
  * You are using a micro frontend architecture and want to achieve decoupling of your micro frontends for parallel development.

## How to use

### In parent component/app

```
npm i --save redux-subspace
```

Combine component's reducer

```
import { combineReducers } from 'redux'
import { reducer as subComponent } from 'some-dependency'

...

const reducer = combineReducers({ subComponent })
```

Wrap sub-component with provider

```
import { SubspaceProvider } from 'redux-subspace'
import { SubComponent } from 'some-dependency'

...

<SubspaceProvider mapState={state => state.subComponent}>
    <SubComponent />
</SubspaceProvider>
```

### In sub-component

Export reducer

```
const initialState = {
    value: "store value"
}

export default function reducer(state = initialState, action) {
    ...
    return state
}
```

Use in mapStateToProps

```
const mapStateToProps = state => {
    return {
        value: state.value,
        parentValue: state.root.value
    }
}
```

An additional `root` node is added to the state which will reflect the root state.

### Namespacing

Namespacing sub-components allows multiple instances of the component to exist on the same page, without the actions affecting each other's state.

To namespace the sub-component both the provider and the reducer need to be namespaced by the parent component/app. The `type` of any dispatched namespaced actions will be in the format `givenNamespace/originalType`.

#### Provider

```
import { SubspaceProvider } from 'redux-subspace'
import { SubComponent } from 'some-dependency'

...

<SubspaceProvider mapState={state => state.subComponent}, namespace='myComponent'>
    <SubComponent />
</SubspaceProvider>
```

#### Reducers

```
import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as subComponent } from 'some-dependency'

...

const reducer = combineReducers({ subComponent: namespaced(subComponent, 'myComponent') })
```

#### Global Actions

Occasionally you may have actions that need to go beyond your small view of the world.  Adding `globalAction: true` to your action will tell the `SubspaceProvider` to not prepend the namespace and `namespaced` to not exclude it from the reducer.

```
const globalActionCreator = globalValue => {
    return { type = "GLOBAL_ACTION", globalValue, globalAction: true }
}
```

### Thunks

Any actions dispatched by your thunks are wrapped with the same subspace and namespacing rules as standard actions.  If they use the `getState` function, they will receive the state provided by the subspace.

### Nesting Subspaces

When nesting subspaces, the `root` node will reflect the top most root state. Namespaced actions and reducers will be prepended with the parent's namespace, if provided.

## Caveats

* You cannot use `root` as a field in your state. It will be replaced with the root of the state tree.  Sorry.
* We assume you are using redux-thunk if you dispatch a function as an action.  If you're not, please submit a pull request adding compatibility with your middleware of choice, without breaking thunk for us.
