/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef, useMemo, useContext } from "react"
import { ReactReduxContext } from "react-redux"
import { subspace } from "redux-subspace"
import isObject from "../utils/isObject"
import isFunction from "../utils/isFunction"

export const useSubspace = (mapState, namespace, options) => {
  if (options === undefined && isObject(namespace)) {
    return useSubspace(mapState, undefined, namespace)
  }

  const { context = ReactReduxContext } = options || {}

  const mapStateFunc = useRef(mapState)
  mapStateFunc.current = mapState

  const subspacer = isFunction(mapState)
    ? useMemo(
        () => subspace((...args) => mapStateFunc.current(...args), namespace),
        [mapStateFunc, namespace]
      )
    : useMemo(() => subspace(mapState, namespace), [mapState, namespace])

  const { store } = useContext(context)
  return useMemo(() => subspacer(store), [subspacer, store])
}

export default useSubspace
