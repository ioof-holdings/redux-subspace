/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import PropTypes from "prop-types"
import { ReactReduxContext } from "react-redux"
import useParentSpace from "../hooks/useParentSpace"
import useReplacedContext from "../hooks/useReplacedContext"

const ParentSpaceProvider = ({
  context = ReactReduxContext,
  children
}) => {
  const {
    parent: ParentContext = context.Consumer ? context : ReactReduxContext,
    child: ChildContext = context.Consumer ? context : ReactReduxContext
  } = context

  const parentStore = useParentSpace({ context: ParentContext })
  const childContext = useReplacedContext(ChildContext, parentStore)
  
  return (
    <ChildContext.Provider value={childContext}>
      {children}
    </ChildContext.Provider>
  )
}

ParentSpaceProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default ParentSpaceProvider
