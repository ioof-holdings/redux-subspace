/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName'
import { subspace } from 'redux-subspace'
import SubspaceProvider from './SubspaceProvider'

const subspaced = (mapState, namespace) => {

    const subspaceDecorator = subspace(mapState, namespace)

    return (WrappedComponent) => {
        
        const SubspacedComponent = (props) => (
            <SubspaceProvider subspaceDecorator={subspaceDecorator}>
                <WrappedComponent {...props} />
            </SubspaceProvider>
        )

        hoistNonReactStatics(SubspacedComponent, WrappedComponent)

        SubspacedComponent.displayName = wrapDisplayName(WrappedComponent, 'Subspaced')

        return SubspacedComponent
    }
}

export default subspaced
