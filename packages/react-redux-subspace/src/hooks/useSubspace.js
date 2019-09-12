/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useMemo, useRef } from "react"
import { ReactReduxContext } from "react-redux"
import { subspace } from "redux-subspace"
import isObject from "../utils/isObject"

export const useSubspace = (
  mapState,
  namespace,
  options
) => {
  if (options === undefined && isObject(namespace)) {
    return useSubspace(mapState, undefined, namespace)
  }

  const { context = ReactReduxContext } = options || {}

  const mapStateRef = useRef(mapState)
  mapStateRef.current = mapState

  const isMapStateFunction = typeof mapStateRef.current === "function"

  const subspacer = useMemo(() => {
    const mapStateHandler = isMapStateFunction
      ? (state, rootState) => mapStateRef.current(state, rootState)
      : mapStateRef.current

    return subspace(mapStateHandler, namespace)
  }, [
    isMapStateFunction ? mapStateRef : mapStateRef.current,
    namespace
  ])

  const { store } = useContext(context)
  return useMemo(() => subspacer(store), [subspacer, store])
}

export default useSubspace
