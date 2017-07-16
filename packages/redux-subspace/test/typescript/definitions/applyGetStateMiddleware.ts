/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { configureSubspaces, applyGetStateMiddleware } from '../../../src'

const getStateMiddleware = (subspace) => (next) => () => next()

const storeEnhancer = configureSubspaces(applyGetStateMiddleware(getStateMiddleware))