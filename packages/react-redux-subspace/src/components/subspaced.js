/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { subspace } from 'redux-subspace'
import SubspaceProvider from './SubspaceProvider'

const subspaced = (mapState, namespace) => {

    const subspaceDecorator = subspace(mapState, namespace)

    return (WrappedComponent) => {

        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component'

        const displayName = `Subspaced(${wrappedComponentName})`

        const SubspacedComponent = (props) => (
            <SubspaceProvider subspaceDecorator={subspaceDecorator}>
                <WrappedComponent {...props} />
            </SubspaceProvider>
        )

        SubspacedComponent.displayName = displayName

        return SubspacedComponent
    }
}

export default subspaced
