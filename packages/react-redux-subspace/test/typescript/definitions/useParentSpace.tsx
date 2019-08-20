/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { useParentSpace } from '../../../src'

const parentSpace = useParentSpace()

const parentSpaceWithContextOverride = useParentSpace({ context: React.createContext(null) })
