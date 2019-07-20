/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children } from "react"
import PropTypes from "prop-types"
import { Provider, ReactReduxContext } from "react-redux"
import { parentSpace } from "redux-subspace"

const ParentSpaceProvider = ({ children }) => (
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <Provider store={parentSpace(store)}>{Children.only(children)}</Provider>
    )}
  </ReactReduxContext.Consumer>
)

ParentSpaceProvider.propTypes = {
  children: PropTypes.element.isRequired
}

ParentSpaceProvider.contextTypes = {
  store: PropTypes.object.isRequired
}

ParentSpaceProvider.childContextTypes = {
  store: PropTypes.object
}

export default ParentSpaceProvider
