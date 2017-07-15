/**
 * Copyright 2016, IOOF Holdings Limited.
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

const SubStatetandardComponent = subspaced((state: ParentState) => state.child)(StandardComponent)
const NamespacedStandardComponent = subspaced("testNamespace")(StandardComponent)
const SubspacedStandardComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StandardComponent)
const SubStateStatelessComponent = subspaced((state: ParentState) => state.child)(StatelessComponent)
const NamespacedStatelessComponent = subspaced("testNamespace")(StatelessComponent)
const SubspacedStatelessComponent = subspaced((state: ParentState) => state.child, "testNamespace")(StatelessComponent)

const SubStateStandardComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }))(StandardComponent)
const SubspacedStandardComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }), "testNamespace")(StandardComponent)
const SubStateStatelessComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }))(StatelessComponent)
const SubspacedStatelessComponentWithRoot = subspaced((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }), "testNamespace")(StatelessComponent)

const Rendered: React.StatelessComponent<void> = () => {
    return (
        <div>
            <SubspacedStandardComponent value="test" />
            <NamespacedStandardComponent value="test" />
            <SubspacedStatelessComponent value="test" />
            <NamespacedStatelessComponent value="test" />
            <SubStateStandardComponentWithRoot value="test" />
            <SubspacedStandardComponentWithRoot value="test" />
            <SubStateStatelessComponentWithRoot value="test" />
            <SubspacedStatelessComponentWithRoot value="test" />
        </div>
    )
}
