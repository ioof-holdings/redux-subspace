import * as React from 'react'
import { subspaced } from '../../../src'

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class TestProps {
    value: string
}

class StandardComponent extends React.Component<TestProps, void> {
    render() {
        return <p>{this.props.value}</p>
    }
}

const StatelessComponent: React.StatelessComponent<TestProps> = (props) => <p>props.value</p>

const SubspacedStandardComponent = subspaced((state: ParentState) => state.child)(StandardComponent)
const NamespacedStandardComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StandardComponent)
const SubspacedStatelessComponent = subspaced((state: ParentState) => state.child)(StatelessComponent)
const NamespacedStatelessComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StatelessComponent)

const Rendered: React.StatelessComponent<void> = () => {
    return (
        <div>
            <SubspacedStandardComponent value="test" />
            <NamespacedStandardComponent value="test" />
            <SubspacedStatelessComponent value="test" />
            <NamespacedStatelessComponent value="test" />
        </div>
    )
}