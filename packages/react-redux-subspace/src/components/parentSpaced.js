/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import ParentSpaceProvider from "./ParentSpaceProvider";
import createDisplayName from "../utils/createDisplayName";

const parentSpaced = (parentSpaceOptions) => (WrappedComponent) => {
  const ParentSpacedComponent = React.forwardRef((props, ref) => (
    <ParentSpaceProvider {...parentSpaceOptions}>
      <WrappedComponent {...props} ref={ref} />
    </ParentSpaceProvider>
  ));

  hoistNonReactStatics(ParentSpacedComponent, WrappedComponent);

  ParentSpacedComponent.displayName = createDisplayName(
    WrappedComponent,
    "ParentSpaced"
  );

  return ParentSpacedComponent;
};

export default parentSpaced;
