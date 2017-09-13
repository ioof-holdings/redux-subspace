/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { namespaced as subspaceNamespaced, namespacedAction } from 'redux-subspace'
import { loop, isLoop, getCmd, getEffect, getModel } from 'redux-loop'

const namespacedEffect = (namespace) => {

    const actionNamespacer = namespacedAction(namespace)

    return function namespaceEffect(effect) {
        if (effect.type === 'PROMISE') {
            return {
                ...effect,
                factory: (...args) => effect
                    .factory(...args)
                    .then(actionNamespacer)
                    .catch(actionNamespacer)
            }
        }

        if (effect.type === 'CONSTANT') {
            return {
                ...effect,
                action: actionNamespacer(effect.action)
            }
        }

        if (effect.type === 'BATCH') {
            return {
                ...effect,
                effects: effect.effects.map(namespaceEffect)
            }
        }

        return effect
    }
}


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

        if (cmd.type === "BATCH" || cmd.type === "SEQUENCE") {
            return {
                ...cmd,
                cmds: cmd.cmds.map(namespaceCommand)
            }
        }

        return cmd
    }
}

export default (isV2) => {
    const namespacedSideEffect = isV2 ? namespacedEffect : namespacedCommand
    const getSideEffect = isV2 ? getEffect : getCmd

    return function namespaced(namespace) {
        const namespacer = subspaceNamespaced(namespace)
        const commandNamespacer = namespacedSideEffect(namespace)

        return reducer => {
            return namespacer((state, action) => {
                const result = reducer(state, action)
                if (isLoop(result)) {
                    const model = getModel(result)
                    const cmd = getSideEffect(result)

                    return loop(model, commandNamespacer(cmd))
                }
                return result
            })
        }
    }
}
