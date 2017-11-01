/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux'
import { namespacedAction } from '../../../src'

const action = namespacedAction('test')({ type: 'TEST_ACTION' })
