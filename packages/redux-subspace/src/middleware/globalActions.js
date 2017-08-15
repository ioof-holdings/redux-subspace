/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import globalAction from '../actions/globalAction'

const globalActions = (...actionTypes) => () => (next) => (action) => action.type && actionTypes.find((type) => action.type.match(type)) 
    ? next(globalAction(action)) 
    : next(action)

export default globalActions
