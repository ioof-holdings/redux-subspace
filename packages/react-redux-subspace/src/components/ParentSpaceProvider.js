/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import PropTypes from "prop-types"
import { ReactReduxContext, Provider } from "react-redux"
import useParentSpace from "../hooks/useParentSpace"

const ParentSpaceProvider = ({
  context = ReactReduxContext,
  children
}) => {
  const {
    parent: ParentContext = context.Consumer ? context : ReactReduxContext,
    child: ChildContext = context.Consumer ? context : ReactReduxContext
  } = context

  const parentStore = useParentSpace({ context: ParentContext })
  
  return (
    <Provider store={parentStore} context={ChildContext}>
      {children}
    </Provider>
  )
}

ParentSpaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  context: PropTypes.oneOfType([
    PropTypes.shape({ parent: PropTypes.object, child: PropTypes.object }),
    PropTypes.object
  ])
}

export default ParentSpaceProvider
