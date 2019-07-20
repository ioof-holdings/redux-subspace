/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children, useMemo } from "react"
import PropTypes from "prop-types"
import { Provider, ReactReduxContext } from "react-redux"
import { subspace } from "redux-subspace"

const SubspaceProvider = ({
  mapState,
  namespace,
  subspaceDecorator = useMemo(() => subspace(mapState, namespace), [
    mapState,
    namespace
  ]),
  children
}) => (
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <Provider store={subspaceDecorator(store)}>
        {Children.only(children)}
      </Provider>
    )}
  </ReactReduxContext.Consumer>
)

SubspaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  mapState: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  namespace: PropTypes.string,
  subspaceDecorator: PropTypes.func
}

export default SubspaceProvider
