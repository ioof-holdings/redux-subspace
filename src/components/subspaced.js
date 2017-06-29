/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import SubspaceProvider from './SubspaceProvider'

export default (mapState, namespace = undefined) => (WrappedComponent) => {

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component'

    const displayName = `Subspaced(${wrappedComponentName})`

    const SubspacedComponent = (props) => (
        <SubspaceProvider mapState={mapState} namespace={namespace}>
            <WrappedComponent {...props} />
        </SubspaceProvider>
    )

    SubspacedComponent.displayName = displayName

    return SubspacedComponent
}