/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { useSubspace } from '../../../src'

class ChildState {
    value: any
}

class ParentState {
    child: ChildState
}

class RootState {
    parent: ParentState
}

const subStateSubspace = useSubspace((state: ParentState) => state.child)
const namespacedSubspace = useSubspace("testNamespace")
const subspace = useSubspace((state: ParentState) => state.child, "testNamespace")

const subStateSubspaceWithRoot = useSubspace((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }))
const subspaceWithRoot = useSubspace((state: ParentState, rootState: RootState) => ({ ...state.child, ...rootState.parent }), "testNamespace")

const subStateSubspaceWithContextOverride = useSubspace((state: ParentState) => state.child, { context: React.createContext(null) })
const namespacedSubspaceWithContextOverride = useSubspace("testNamespace", { context: React.createContext(null) })
const subspaceWithContextOverride = useSubspace((state: ParentState) => state.child, "testNamespace", { context: React.createContext(null) })
