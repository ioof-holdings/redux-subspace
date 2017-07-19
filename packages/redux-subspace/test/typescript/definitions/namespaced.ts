/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Reducer } from 'redux'
import { namespaced } from '../../../src'

const reducer = (state = 'test') => {
    return state
}

const namespacedReducer: Reducer<string> = namespaced('testNamespace')(reducer)
