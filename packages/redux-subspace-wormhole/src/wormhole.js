/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from "lodash.isplainobject"
import memoizeOne from "memoize-one"

const wormhole = (mapState, key) => {
  if (typeof mapState === "string") {
    const mapStateKey = mapState
    mapState = state => state[mapStateKey]

    if (key === undefined) {
      key = mapStateKey
    }
  }

  return store => {
    const createWormhole = memoizeOne((state, key, value) => ({ [key]: value, ...state }))

    return {
      getState: next => () => {
        const state = next()
        if (isPlainObject(state)) {
          return createWormhole(state, key, mapState(store.rootStore.getState()))
        } else {
          return state
        }
      }
    }
  }
}

export default wormhole
