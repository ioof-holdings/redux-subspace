/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { asGlobal, GlobalActionsRegister } from '../../src/actions/GlobalActions'

describe('GlobalActions Tests', () => {

    const GlobalActions = new GlobalActionsRegister().register("REGISTERED_ACTION")

    it('should consider property based global actions as global', () => {
        let action = { type: "PROPERTY_BASED_ACTION", newValue: "new state", globalAction: true }
        expect(GlobalActions.isGlobal(action)).to.true
    })

    it('should consider registered global actions as global', () => {

        let action = { type: "REGISTERED_ACTION", newValue: "new state" }
        expect(GlobalActions.isGlobal(action)).to.true
    })

    it('should not consider other actions as global', () => {
        let action = { type: "OTHER_ACTION", newValue: "new state" }
        expect(GlobalActions.isGlobal(action)).to.false
    })

    it('should make actions global', () => {
        let action = asGlobal({ type: "BASIC_ACTION", newValue: "new state" })
        expect(action.type).to.equal("BASIC_ACTION")
        expect(action.newValue).to.equal("new state")
        expect(action.globalAction).to.true
    })
})
