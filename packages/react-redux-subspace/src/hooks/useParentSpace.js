/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useMemo } from "react"
import { ReactReduxContext } from "react-redux"
import { parentSpace } from "redux-subspace"

const useParentSpace = (
  { context = ReactReduxContext } = {}
) => {
  const { store } = useContext(context)
  return useMemo(() => parentSpace(store), [store])
}

export default useParentSpace
