/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const asGlobal = (action) => {
    return {
        globalAction: true,
        ...action
    }
}

export class GlobalActionsRegister {
    constructor() {
        this._registeredActions = new Set()
    }

    register(type) {
        this._registeredActions.add(type)
        return this
    }

    isGlobal(action) {
        return action.globalAction || this._registeredActions.has(action.type)
    }
}

export const GlobalActions = new GlobalActionsRegister()