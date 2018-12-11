/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const REDUX_PREFIX = '@@redux/'

const reduxSpecific = (action) => action.type.startsWith(REDUX_PREFIX)

export default reduxSpecific