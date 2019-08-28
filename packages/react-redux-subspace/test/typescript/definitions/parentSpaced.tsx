/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { parentSpaced } from '../../../src'

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

const ParentSpacedStandardComponent = parentSpaced()(StandardComponent)
const ParentSpacedStatelessComponent = parentSpaced()(StatelessComponent)

const ParentSpacedStandardComponentWithContextOverride = parentSpaced({ context: React.createContext(null) })(StandardComponent)
const ParentSpacedStatelessComponentWithContextOverride = parentSpaced({ context: React.createContext(null) })(StatelessComponent)

const ParentSpacedStandardComponentWithParentContextOverride = parentSpaced({ context: { parent: React.createContext(null) } })(StandardComponent)
const ParentSpacedStatelessComponentWithParentContextOverride = parentSpaced({ context: { parent: React.createContext(null) } })(StatelessComponent)

const ParentSpacedStandardComponentWithChildContextOverride = parentSpaced({ context: { child: React.createContext(null) } })(StandardComponent)
const ParentSpacedStatelessComponentWithChildContextOverride = parentSpaced({ context: { child: React.createContext(null) } })(StatelessComponent)

const Rendered: React.StatelessComponent<void> = () => {
    return (
        <div>
            <ParentSpacedStandardComponent value="test" />
            <ParentSpacedStatelessComponent value="test" />
            <ParentSpacedStandardComponentWithContextOverride value="test" />
            <ParentSpacedStatelessComponentWithContextOverride value="test" />
            <ParentSpacedStandardComponentWithParentContextOverride value="test" />
            <ParentSpacedStatelessComponentWithParentContextOverride value="test" />
            <ParentSpacedStandardComponentWithChildContextOverride value="test" />
            <ParentSpacedStatelessComponentWithChildContextOverride value="test" />
        </div>
    )
}
