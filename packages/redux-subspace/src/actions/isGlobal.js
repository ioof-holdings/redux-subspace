/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const isGlobal = (action) => !action.type || action.globalAction === true || action.alreadyNameSpaced

export default isGlobal