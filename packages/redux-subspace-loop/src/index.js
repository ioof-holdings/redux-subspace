/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCmd } from 'redux-loop'
import createNamespacer from './namespaced'

const IS_REDUX_LOOP_V2 = !getCmd

export const namespaced = createNamespacer(IS_REDUX_LOOP_V2)
