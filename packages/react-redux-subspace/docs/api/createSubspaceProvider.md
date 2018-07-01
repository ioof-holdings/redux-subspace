# `createSubspaceProvider([storeKey], [parentStoreKey])`

A function that returns a new [SubspaceProvider](/packages/react-redux-subspace/docs/api/SubspaceProvider.md) which provides and consumes stores on the given context keys. `SubspaceProvider` itself is simply the result of calling `createSubspaceProvider()`.

## Arguments

1. `storeKey` (_string_): The context key to provide. The default is `store`, which is the default key that Redux's `connect` will look at.
2. `parentStoreKey` (_string_): The context key to on which to look for a store. The default is `store`, which is the key provided by Redux's default Provider.

## Examples

Here is a basic example in which a subspace is provided on the 'subAppStore' key. This can be useful if you have a micro-frontend which will need to return rendering control to its parent, which will expect to have the root store defined on the `store` context key.

```javascript
import React from `react`
import { createSubspaceProvider } from 'react-redux-subspace'
import { connect } from 'react-redux'

const SubspaceProvider = createSubspaceProvider('subAppStore')

function MyComponent() {
    return (
        <SubspaceProvider mapState={(state) => state.subApp}>
            <SubAppComponent />
        </SubspaceProvider>
    )
}

let SubAppComponent = props => <span>{props.foo}</span>;

function mapStateToProps(state) {
    return {foo: state.foo};
}

const SubAppComponent = connect(mapStateToProps, null, null, {storeKey: 'subAppStore'})(SubAppComponent)
```

This example consumes a root Redux store which is defined on a different context key, namely `rootStore`.

```javascript
import React from `react`
import { createSubspaceProvider } from 'react-redux-subspace'
import { connect, createProvider } from 'react-redux'

const Provider = createProvider('rootStore');
const SubspaceProvider = createSubspaceProvider('subAppStore', 'rootStore');

function MyComponent() {
    return (
        <Provider store={reduxStore}>
            <SubspaceProvider mapState={(state) => state.subApp}>
                <SubAppComponent />
            </SubspaceProvider>
        </Provider>
    )
}

let SubAppComponent = props => <span>{props.foo}</span>;

function mapStateToProps(state) {
    return {foo: state.foo};
}

const SubAppComponent = connect(mapStateToProps, null, null, {storeKey: 'subAppStore'})(SubAppComponent)
```