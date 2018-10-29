/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { namespaced as subspaceNamespaced, namespacedAction } from 'redux-subspace'
import { loop, isLoop, getCmd, getModel } from 'redux-loop'

const namespacedCommand = (namespace) => {
    const actionNamespacer = namespacedAction(namespace)

    return function namespaceCommand(cmd) {
        if (cmd.type === "RUN") {
            return {
                ...cmd,
                successActionCreator: (...args) => actionNamespacer(cmd.successActionCreator(...args)),
                failActionCreator: (...args) => actionNamespacer(cmd.failActionCreator(...args))
            }
        }

        if (cmd.type === "ACTION") {
            return {
                ...cmd,
                actionToDispatch: actionNamespacer(cmd.actionToDispatch)
            }
        }

        if (cmd.type === "LIST" || cmd.type === "BATCH" || cmd.type === "SEQUENCE") {
            return {
                ...cmd,
                cmds: cmd.cmds.map(namespaceCommand)
            }
        }

        return cmd
    }
}

const namespaced = (namespace) => {
    const namespacer = subspaceNamespaced(namespace)
    const commandNamespacer = namespacedCommand(namespace)

    return reducer => {
        return namespacer((state, action) => {
            const result = reducer(state, action)
            if (isLoop(result)) {
                const model = getModel(result)
                const cmd = getCmd(result)

                return loop(model, commandNamespacer(cmd))
            }
            return result
        })
    }
}

export default namespaced
