/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics"
import wrapDisplayName from "recompose/wrapDisplayName"
import ParentSpaceProvider from "./ParentSpaceProvider"

const parentSpaced = (parentSpaceOptions) => WrappedComponent => {
  const ParentSpacedComponent = props => (
    <ParentSpaceProvider {...parentSpaceOptions}>
      <WrappedComponent {...props} />
    </ParentSpaceProvider>
  )

  hoistNonReactStatics(ParentSpacedComponent, WrappedComponent)

  ParentSpacedComponent.displayName = wrapDisplayName(
    WrappedComponent,
    "ParentSpaced"
  )

  return ParentSpacedComponent
}

export default parentSpaced
