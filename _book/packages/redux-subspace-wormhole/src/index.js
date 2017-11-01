/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyToChildren } from 'redux-subspace'
import wormhole from './wormhole'

export default (mapState, key) => applyToChildren(wormhole(mapState, key))
