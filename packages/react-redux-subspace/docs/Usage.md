# Usage

React Redux Subspace provides React bindings to create subspaces for components.

## Creating a subspace for a component

`SubspaceProvider` is a [`react-redux`](https://github.com/reactjs/react-redux) compatable React component that subspaces it's children:

```javascript
import React from `react`
import { SubspaceProvider } from 'react-redux-subspace'
import SubApplication from 'some-dependency'

class MyComponent extends React.Component {
    render() {
        return (
            <SubspaceProvider mapState={(state) => state.subApp} namespace="subApp">
                <SubApplication />
            </SubspaceProvider>
        )
    }
}
```

By wrapping `SubApplication` in a subspace, the state injected into [`mapStateToProps` of connected components](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) within the subspace will be the state mapped from the `mapState` prop.  The `namespace` prop will be used to [namespace](/docs/basics/Namespacing.md) the actions dispatched from [`mapDispatchToProps` of connected components](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) within the subspace.

For example, if the application's state looked like:

```json
{
    "subApp": {
        "value": "example"
    }
}
```

`SubApplication` might look something like:

```javascript
import React from 'react'
import { setValue } from './actions'

class SubApplication {
    render() {
        return (
            <input type="text" value={this.props.value} onChange={(e) => this.props.setValue(e.target.value)} />
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.value
})

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch(setValue(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubApplication)
```

There is a restriction that a `SubspaceProvider` must be mounted within a [`react-redux` `Provider`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store), somewhere above it in the component tree:

```javascript
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import reducer from 'somewhere'
import SomeOtherComponent from 'some-other-dependency'
import SubApplication from 'some-dependency'

const store = createStore(reducer)

class App extends React.Component {
    render: {
        return (
            <Provider store={store}>
                <div>
                    <SomeOtherComponent />
                    <SubspaceProvider mapState={(state) => state.subApp} namespace="subApp">
                        <SubApplication />
                    </SubspaceProvider>
                <div>
            </Provider>
        )
    }
}
```

### Higher-Order Component

`react-redux-subspace` also provides a `subspaced` HOC that wraps a provided component in a `SubspaceProvider` which can be useful when you want to subspace a component, but don't want to do it in jsx, e.g. exporting the component or passing it as a prop:

```javascript
import { subspaced } from 'react-redux-subspace'
import SubApplication from 'some-dependency'

export default subspaced((state) => state.subApp, 'subApp')(SubApplication)
```

```javascript
import { BrowserRouter } from 'react-router-dom'
import { subspaced } from 'react-redux-subspace`
import SubApplication from 'some-dependency'

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/subApp" component={subspaced((state) => state.subApp, 'subApp')(SubApplication)} />
    </div>
  </BrowserRouter>
)
```
