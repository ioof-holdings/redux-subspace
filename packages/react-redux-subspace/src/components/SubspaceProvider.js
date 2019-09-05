/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useMemo } from "react"
import PropTypes from "prop-types"
import { ReactReduxContext, Provider } from "react-redux"
import { useSubspaceAdvanced } from "../hooks/useSubspace"

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

  return (
    <Provider store={subspacedStore} context={ChildContext}>
      {children}
    </Provider>
  )
}

SubspaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  mapState: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  namespace: PropTypes.string,
  subspaceDecorator: PropTypes.func,
  context: PropTypes.oneOfType([
    PropTypes.shape({ parent: PropTypes.object, child: PropTypes.object }),
    PropTypes.object
  ])
}

export default SubspaceProvider
