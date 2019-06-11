/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import subspace from '../../src/store/subspace'
import parentSpace from '../../src/store/parentSpace'

describe('parentSpace Tests', () => {

    const grandchild = (state = "expected") => state
    const child = combineReducers({ child: grandchild });
    const rootReducer = combineReducers({ child })
    const store = createStore(rootReducer)

    it('should negate a call to subspace', () => {
        const childStore = subspace((state) => state.child)(store)
        expect(parentSpace(childStore)).to.equal(store)
    })

    it('should be chainable with itself', () => {
        const childStore = subspace((state) => state.child)(store)
        const grandchildStore = subspace((state) => state.child)(childStore)
        expect(parentSpace(parentSpace(childStore))).to.equal(store)
    })

    it('should be a no-op if no parent space is present', () => {
        expect(parentSpace(store)).to.equal(store)
    })
})
