/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import globalAction from '../actions/globalAction'
import isGlobal from '../actions/isGlobal'

const isMatch = (expectedType, actualType) => {
  return typeof expectedType === 'string' ? actualType === expectedType : actualType.match(expectedType) !== null
}

const shouldBeGlobal = (action, actionTypes) => {
  return !isGlobal(action) && actionTypes.find((type) => isMatch(type, action.type))
}

const globalActions = (...actionTypes) => (store) => (next) => (action) => shouldBeGlobal(action, actionTypes) 
  ? store.dispatch(globalAction(action)) 
  : next(action)

export default globalActions
