/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getEffect, Cmd, loop, getCmd } from 'redux-loop'
import { namespacedAction } from 'redux-subspace'
import { namespaced, createNamespacer } from '../../src'

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

    it('should handle RUN command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'RUN'
        }))

        expect(result.successActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
        expect(result.failActionCreator()).to.deep.equal(actionNamespacer(createEffectAction()))
    })

    it('should handle ACTION command type', () => {
        const actionNamespacer = namespacedAction('test')
        const namespacedReducer = namespaced('test')(commandsReducer)

        const result = getCmd(namespacedReducer(undefined, {
            type: 'ACTION'
        }))
        expect(result.actionToDispatch).to.deep.equal(actionNamespacer(COMMAND_ACTION))
    })

    it('should handle BATCH command type', () => {
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

    it('should handle SEQUENCE command type', () => {
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

    describe('redux-loop v2', () => {

        const TEST_ACTION = 'TEST_ACTION'

        const COMMAND_ACTION = { type: TEST_ACTION }
        const createEffectAction = (payload) => ({ ...COMMAND_ACTION, payload })
        const v2Namespaced = createNamespacer(true)

        function fetchUser(user) {
            return Promise.resolve(user)
                .then(createEffectAction)
                .catch(createEffectAction)
        }

        const Effects = {
            batch: (effects) => ({
                ...Cmd.none,
                effects,
                type: 'BATCH'
            }),
            constant: (action) => ({
                ...Cmd.none,
                action,
                type: 'CONSTANT'
            }),
            none: () => Cmd.none,
            promise: (factory, ...args) => ({
                ...Cmd.none,
                factory,
                args,
                type: 'PROMISE'
            })
        }

        const effectsReducer = (state = 'initial value', action) => {
            switch (action.type) {
                case 'PROMISE':
                    return loop(state, Effects.promise(fetchUser, {name: 'John'}))

                case 'CONSTANT':
                    return loop(state, Effects.constant(COMMAND_ACTION))

                case 'BATCH':
                    return loop(state, Effects.batch([
                        Effects.promise(fetchUser, {name: 'John'}),
                        Effects.constant(COMMAND_ACTION)
                    ]))
                case 'NONE':
                    return loop(state, Effects.none())

                default:
                    return state
            }
        }

        it('should namespace actions created with commands', async () => {
            const namespacedReducer = v2Namespaced('test')(effectsReducer)
            const result = namespacedReducer(undefined, {
                type: 'CONSTANT'
            })

            const actionNamespacer = namespacedAction('test')

            expect(result[1].action).to.deep.equal(actionNamespacer({ type: TEST_ACTION }))
        })

        it('should handle PROMISE command type', async () => {
            const actionNamespacer = namespacedAction('test')
            const namespacedReducer = v2Namespaced('test')(effectsReducer)

            const result = getEffect(namespacedReducer(undefined, {
                type: 'PROMISE'
            }))

            expect(await result.factory()).to.deep.equal(actionNamespacer(createEffectAction()))
        })

        it('should handle CONSTANT command type', () => {
            const actionNamespacer = namespacedAction('test')
            const namespacedReducer = v2Namespaced('test')(effectsReducer)

            const result = getEffect(namespacedReducer(undefined, {
                type: 'CONSTANT'
            }))
            expect(result.action).to.deep.equal(actionNamespacer(COMMAND_ACTION))
        })

        it('should handle BATCH command type', async () => {
            const actionNamespacer = namespacedAction('test')
            const namespacedReducer = v2Namespaced('test')(effectsReducer)

            const result = getEffect(namespacedReducer(undefined, {
                type: 'BATCH'
            }))

            const [promiseEffect, actionEffect] = result.effects

            expect(await promiseEffect.factory()).to.deep.equal(actionNamespacer(createEffectAction()))
            expect(actionEffect.action).to.deep.equal(actionNamespacer(COMMAND_ACTION))
        })
    })
})
