# `<ParentSpaceProvider>`

A [`react-redux`](https://github.com/reactjs/react-redux) compatible [React component](https://facebook.github.io/react/docs/components-and-props.html) that will allow its children to behave as if they were not inside the nearest enclosing [`<SubspaceProvider>`](/docs/api/SubspaceProvider.md).

## Props

None.

## Examples

React recommends using "render props" in certain situations to establish an inverted control between components. This can lead to trouble when the render props are passed to a subspaced component since any redux-connected components inside the render prop will find themselves inside a subspace that they do not wish to be in. Ususally code inside a render prop is meant to execute in the environment exterior to the component with the prop

```javascript
import React from `react`
import { SubspaceProvider, ParentSpaceProvider } from 'react-redux-subspace'
import TableWithSelection from 'somewhere'

class MyComponent extends React.Component {
    render() {
        return (
            <SubspaceProvider mapState={(state) => state.tableSelection} namespace="TABLE">
                <TableWithSelection
                    renderRow={row => 
                        // Row's state here is just the table selection.
                        // <ParentSpaceProvider> gives us back the full
                        // state object which includes state.tableSelection
                        <ParentSpaceProvider>
                            <TableRow/>
                        </ParentSpaceProvider>
                    } />
            </SubspaceProvider>
        )
    }
}
```

