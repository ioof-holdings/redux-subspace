/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import SubspaceProvider from "./SubspaceProvider";
import isObject from "../utils/isObject";
import createDisplayname from "../utils/createDisplayname";

const subspaced = (mapState, namespace, subspaceOptions) => {
  if (subspaceOptions === undefined && isObject(namespace)) {
    return subspaced(mapState, undefined, namespace);
  }

  return (WrappedComponent) => {
    const SubspacedComponent = React.forwardRef((props, ref) => (
      <SubspaceProvider
        {...subspaceOptions}
        mapState={mapState}
        namespace={namespace}
      >
        <WrappedComponent {...props} ref={ref} />
      </SubspaceProvider>
    ));

    hoistNonReactStatics(SubspacedComponent, WrappedComponent);

    SubspacedComponent.displayName = createDisplayname(
      WrappedComponent,
      "Subspaced"
    );

    return SubspacedComponent;
  };
};

export default subspaced;
