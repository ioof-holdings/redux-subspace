/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { loop, Effects, install, combineReducers } from 'redux-loop'
import { namespaced } from '../../../src'

const reducer = (state = {}) => loop(state, Effects.none)

createStore(combineReducers({
  child: namespaced('test')(reducer)
}), install())