/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Cmd, loop, getCmd } from 'redux-loop'
import { namespacedAction } from 'redux-subspace'
import { namespaced } from '../../src'

describe('namespaced', () => {

    const TEST_ACTION_TRIGGER = 'TEST_ACTION_TRIGGER'
    const TEST_ACTION = 'TEST_ACTION'

    const reducer = (state = 'initial value', action) => {
        switch (action.type) {
            case TEST_ACTION:
                return action.value
            case TEST_ACTION_TRIGGER:
                return loop(state, Cmd.action({type: TEST_ACTION, value: action.value}))
            default:
                return state
        }
    }

    const COMMAND_ACTION = { type: TEST_ACTION }
    const createEffectAction = (payload) => ({ ...COMMAND_ACTION, payload })

    function fetchUser(user) {
      return Promise.resolve(user)
    }

    const commandsReducer = (state = 'initial value', action) => {
        switch (action.type) {
            case 'RUN':
                return loop(state, Cmd.run(fetchUser, {
                    successActionCreator: createEffectAction,
                    failActionCreator: createEffectAction,
                    args: [{name: 'John'}]
                }))

            case 'ACTION':
              return loop(state, Cmd.action(COMMAND_ACTION))

            case 'BATCH':
                return loop(state, Cmd.batch([
                    Cmd.run(fetchUser, {
                        successActionCreator: createEffectAction,
                        failActionCreator: createEffectAction,
                        args: [{name: 'John'}]
                    }),
                    Cmd.action(COMMAND_ACTION)
                ]))

            case 'SEQUENCE':
                return loop(state, Cmd.sequence([
                    Cmd.run(fetchUser, {
                        successActionCreator: createEffectAction,
                        failActionCreator: createEffectAction,
                        args: [{name: 'John'}]
                    }),
                    Cmd.action(COMMAND_ACTION)
                ]))

            case 'NONE':
                return loop(state, Cmd.none)

            default:
                return state
        }
    }

    it('should namespace actions created with commands', async () => {
        const namespacedReducer = namespaced('test')(reducer)
        const result = namespacedReducer(undefined, {
            type: TEST_ACTION_TRIGGER,
            value: 'foobar'
        })

        const actionNamespacer = namespacedAction('test')
        const expected = loop(
            'initial value',
            Cmd.action(actionNamespacer({type: TEST_ACTION, value: 'foobar'}))
        )
        expect(result).to.deep.equal(expected)
    })

    it('should handle all redux-loop\'s RUN command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'RUN'
        }))

        expect(result.successActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(result.failActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
    })

    it('should handle all redux-loop\'s ACTION command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'ACTION'
        }))
        expect(result.actionToDispatch).to.deep.equal(actionNamespacer(COMMAND_ACTION))
    })

    it('should handle all redux-loop\'s BATCH command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'BATCH'
        }))

        const [runEffect, actionEffect] = result.cmds

        expect(runEffect.successActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(runEffect.failActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(actionEffect.actionToDispatch).to.deep.equal(actionNamespacer(COMMAND_ACTION))
    })

    it('should handle all redux-loop\'s SEQUENCE command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'SEQUENCE'
        }))

        const [runEffect, actionEffect] = result.cmds

        expect(runEffect.successActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(runEffect.failActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(actionEffect.actionToDispatch).to.deep.equal(actionNamespacer(COMMAND_ACTION))
    })
})
