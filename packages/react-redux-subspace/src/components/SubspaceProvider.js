/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useMemo } from "react"
import PropTypes from "prop-types"
import { ReactReduxContext } from "react-redux"
import { useSubspaceAdvanced } from "../hooks/useSubspace"
import useReplacedContext from "../hooks/useReplacedContext"

const SubspaceProvider = ({
  mapState,
  namespace,
  subspaceDecorator,
  context = ReactReduxContext,
  children
}) => {
  const {
    parent: ParentContext = context.Consumer ? context : ReactReduxContext,
    child: ChildContext = context.Consumer ? context : ReactReduxContext
  } = context

  const subspacedStore = useSubspaceAdvanced(
    mapState,
    namespace,
    subspaceDecorator,
    { context: ParentContext }
  )

  const childContext = useReplacedContext(ChildContext, subspacedStore)

  return (
    <ChildContext.Provider value={childContext}>
      {children}
    </ChildContext.Provider>
  )
}

SubspaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  mapState: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  namespace: PropTypes.string,
  subspaceDecorator: PropTypes.func
}

export default SubspaceProvider
