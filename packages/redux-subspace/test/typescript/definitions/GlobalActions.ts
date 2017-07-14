/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalActions } from '../../../src'

GlobalActions.register("TEST_ACTION_1").register("TEST_ACTION_2")

const action = { type: "TEST_ACTION" }

const isGlobal = GlobalActions.isGlobal(action)