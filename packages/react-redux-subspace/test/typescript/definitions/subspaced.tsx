/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { subspaced } from '../../../src'

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class RootState {
    parent: ParentState
}

class TestProps {
    value: string
}

class StandardComponent extends React.Component<TestProps> {
    render() {
        return <p>{this.props.value}</p>
    }
}

const StatelessComponent: React.StatelessComponent<TestProps> = (props) => <p>props.value</p>

const SubStateStandardComponent = subspaced((state: ParentState) => state.child)(StandardComponent)
const NamespacedStandardComponent = subspaced("testNamespace")(StandardComponent)
const SubspacedStandardComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StandardComponent)
const SubStateStatelessComponent = subspaced((state: ParentState) => state.child)(StatelessComponent)
const NamespacedStatelessComponent = subspaced("testNamespace")(StatelessComponent)
const SubspacedStatelessComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StatelessComponent)

const SubStateStandardComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }))(StandardComponent)
const SubspacedStandardComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }), "testNamespace")(StandardComponent)
const SubStateStatelessComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }))(StatelessComponent)
const SubspacedStatelessComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }), "testNamespace")(StatelessComponent)

const SubStateStandardComponentWithContextOverride = subspaced((state: ParentState) => state.child, { context: React.createContext(null) })(StandardComponent)
const NamespacedStandardComponentWithContextOverride = subspaced("testNamespace", { context: React.createContext(null) })(StandardComponent)
const SubspacedStandardComponentWithContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: React.createContext(null) })(StandardComponent)
const SubStateStatelessComponentWithContextOverride = subspaced((state: ParentState) => state.child, { context: React.createContext(null) })(StatelessComponent)
const NamespacedStatelessComponentWithContextOverride = subspaced("testNamespace", { context: React.createContext(null) })(StatelessComponent)
const SubspacedStatelessComponentWithContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: React.createContext(null) })(StatelessComponent)

const SubStateStandardComponentWithParentContextOverride = subspaced((state: ParentState) => state.child, { context: { parent: React.createContext(null) } })(StandardComponent)
const NamespacedStandardComponentWithParentContextOverride = subspaced("testNamespace", { context: { parent: React.createContext(null) } })(StandardComponent)
const SubspacedStandardComponentWithParentContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: { parent: React.createContext(null) } })(StandardComponent)
const SubStateStatelessComponentWithParentContextOverride = subspaced((state: ParentState) => state.child, { context: { parent: React.createContext(null) } })(StatelessComponent)
const NamespacedStatelessComponentWithParentContextOverride = subspaced("testNamespace", { context: { parent: React.createContext(null) } })(StatelessComponent)
const SubspacedStatelessComponentWithParentContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: { parent: React.createContext(null) } })(StatelessComponent)

const SubStateStandardComponentWithChildContextOverride = subspaced((state: ParentState) => state.child, { context: { child: React.createContext(null) } })(StandardComponent)
const NamespacedStandardComponentWithChildContextOverride = subspaced("testNamespace", { context: { child: React.createContext(null) } })(StandardComponent)
const SubspacedStandardComponentWithChildContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: { child: React.createContext(null) } })(StandardComponent)
const SubStateStatelessComponentWithChildContextOverride = subspaced((state: ParentState) => state.child, { context: { child: React.createContext(null) } })(StatelessComponent)
const NamespacedStatelessComponentWithChildContextOverride = subspaced("testNamespace", { context: { child: React.createContext(null) } })(StatelessComponent)
const SubspacedStatelessComponentWithChildContextOverride = subspaced((state: ParentState) => state.child, "testNamespace", { context: { child: React.createContext(null) } })(StatelessComponent)

const Rendered: React.StatelessComponent<void> = () => {
    return (
        <div>
            <SubStateStandardComponent value="test" />
            <SubspacedStandardComponent value="test" />
            <NamespacedStandardComponent value="test" />
            <SubspacedStatelessComponent value="test" />
            <SubStateStatelessComponent value="test" />
            <NamespacedStatelessComponent value="test" />
            <SubStateStandardComponentWithRoot value="test" />
            <SubspacedStandardComponentWithRoot value="test" />
            <SubStateStatelessComponentWithRoot value="test" />
            <SubspacedStatelessComponentWithRoot value="test" />
            <SubStateStandardComponentWithContextOverride value="test" />
            <NamespacedStandardComponentWithContextOverride value="test" />
            <SubspacedStandardComponentWithContextOverride value="test" />
            <SubStateStatelessComponentWithContextOverride value="test" />
            <NamespacedStatelessComponentWithContextOverride value="test" />
            <SubspacedStatelessComponentWithContextOverride value="test" />
            <SubStateStandardComponentWithParentContextOverride value="test" />
            <NamespacedStandardComponentWithParentContextOverride value="test" />
            <SubspacedStandardComponentWithParentContextOverride value="test" />
            <SubStateStatelessComponentWithParentContextOverride value="test" />
            <NamespacedStatelessComponentWithParentContextOverride value="test" />
            <SubspacedStatelessComponentWithParentContextOverride value="test" />
            <SubStateStandardComponentWithChildContextOverride value="test" />
            <NamespacedStandardComponentWithChildContextOverride value="test" />
            <SubspacedStandardComponentWithChildContextOverride value="test" />
            <SubStateStatelessComponentWithChildContextOverride value="test" />
            <NamespacedStatelessComponentWithChildContextOverride value="test" />
            <SubspacedStatelessComponentWithChildContextOverride value="test" />
        </div>
    )
}
