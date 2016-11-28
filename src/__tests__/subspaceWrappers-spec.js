/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getSubState, subStateDispatch, namespacedDispatch, namespacedReducer } from '../subspaceWrappers'

describe('subspaceWrappers Tests', () => {
    describe('getSubState Tests', () => {
        it('should create sub-state', () => {
            let state = {
                state1: {
                    key: 'expected'
                },
                state2: {
                    key: 'wrong'
                }
            }

            let subState = getSubState(() => state, state => state.state1)()

            expect(subState.key).to.equal('expected')
            expect(subState.root).to.equal(state)
        })

        it('should use existing root node', () => {
            let state = {
                state1: {
                    key: 'expected'
                },
                state2: {
                    key: 'wrong'
                },
                root: {
                    states: {
                        state1: {
                            key: 'expected'
                        },
                        state2: {
                            key: 'wrong'
                        }
                    }
                }
            }

            let subState = getSubState(() => state, state => state.state1)()

            expect(subState.key).to.equal('expected')
            expect(subState.root).to.equal(state.root)
        })

        it('should not modify sub-state if primitive value', () => {
            let state = {
                state1: 'expected',
                state2: 'wrong'
            }

            let subState = getSubState(() => state, state => state.state1)()

            expect(subState).to.equal('expected')
            expect(subState.root).to.be.undefined
        })

        it('should not modify sub-state if array value', () => {
            let state = {
                state1: ['expected'],
                state2: ['wrong']
            }

            let subState = getSubState(() => state, state => state.state1)()

            expect(subState).to.deep.equal(['expected'])
            expect(subState.root).to.be.undefined
        })
    })

    describe('subStateDispatch Tests', () => {
        it('should forward standard action to dispatch', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { type: "testAction" }
            subStateDispatch(dispatch, () => state)(action)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction" })
        })

        it('should forward thunk dispatches to dispatch', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = thunkDispatch => {
                let innerAction = { type: "testAction" }
                thunkDispatch(innerAction)
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction" })
        })

        it('should forward nested thunk dispatches to dispatch', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = thunk1Dispatch => {
                let innerAction = thunk2Dispatch => {
                    thunk2Dispatch({ type: "testAction" })
                }
                thunk1Dispatch(innerAction)
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState)

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction" })
        })

        it('should use sub-state for thunk getState function', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = (thunkDispatch, thunkGetState) => {
                let innerAction = { type: "testAction", value: thunkGetState().value }
                thunkDispatch(innerAction)
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction", value: "test" })
        })

        it('should use sub-state for nested thunk getState function', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = (thunk1Dispatch, thunk1GetState) => {
                let innerAction = (thunk2Dispatch, thunk2GetState) => {
                    thunk2Dispatch({ type: "testAction", value: thunk2GetState().value })
                }
                thunk1Dispatch(innerAction)
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState)

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "testAction", value: "test" })
        })

        it('should pass on additional thunk parameters', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "ignored" }, value: "ignored" }
            let state = { value: "ignored" }
            let additionalParameter
            let action = (thunkDispatch, thunkGetState, arg) => {
                additionalParameter = arg
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState, "test")

            expect(additionalParameter).to.equal("test")
        })

        it('should pass on additional nested thunk parameters', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "ignored" }, value: "ignored" }
            let state = { value: "ignored" }
            let additionalParameter
            let action = (thunk1Dispatch, thunk1GetState, arg1) => {
                let innerAction = (thunk2Dispatch, thunk2GetState, arg2) => {
                    additionalParameter = arg2
                }
                thunk1Dispatch(innerAction)
            }
            subStateDispatch(dispatch, () => state)(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState, "ignored")

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState, "test")

            expect(additionalParameter).to.equal("test")
        })

        it('should not modify unknown action formats', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { value: "I have no type!" }
            subStateDispatch(dispatch, () => state)(action)

            expect(dispatch).to.have.been.calledWith(action)
        })
    })

    describe('namespacedDispatch Tests', () => {
        it('should not wrap dispatch in namespace is not provided', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            expect(namespacedDispatch(dispatch, () => state, undefined)).to.be.undefined
        })

        it('should wrap dispatch in namespace', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { type: "testAction" }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction" })
        })

        it('should wrap thunk dispatches in namespace', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = thunkDispatch => {
                let innerAction = { type: "testAction" }
                thunkDispatch(innerAction)
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction" })
        })

        it('should wrap nested thunk dispatches in namespace', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = thunk1Dispatch => {
                let innerAction = thunk2Dispatch => {
                    thunk2Dispatch({ type: "testAction" })
                }
                thunk1Dispatch(innerAction)
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState)

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction" })
        })

        it('should use sub-state for namespaced thunk getState function', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = (thunkDispatch, thunkGetState) => {
                let innerAction = { type: "testAction", value: thunkGetState().value }
                thunkDispatch(innerAction)
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction", value: "test" })
        })

        it('should use sub-state for nested namespaced thunk getState function', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "test" }, value: "wrong" }
            let state = { value: "test" }
            let action = (thunk1Dispatch, thunk1GetState) => {
                let innerAction = (thunk2Dispatch, thunk2GetState) => {
                    thunk2Dispatch({ type: "testAction", value: thunk2GetState().value })
                }
                thunk1Dispatch(innerAction)
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState)

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState)

            expect(dispatch).to.have.been.calledWithMatch({ type: "customNamespace/testAction", value: "test" })
        })

        it('should pass on additional namespaced thunk parameters', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "ignored" }, value: "ignored" }
            let state = { value: "ignored" }
            let additionalParameter
            let action = (thunkDispatch, thunkGetState, arg) => {
                additionalParameter = arg
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk = dispatch.getCall(0).args[0]

            thunk(dispatch, () => rootState, "test")

            expect(additionalParameter).to.equal("test")
        })

        it('should pass on additional nested namespaced thunk parameters', () => {
            let dispatch = sinon.spy()
            let rootState = { parent: { value: "ignored" }, value: "ignored" }
            let state = { value: "ignored" }
            let additionalParameter
            let action = (thunk1Dispatch, thunk1GetState, arg1) => {
                let innerAction = (thunk2Dispatch, thunk2GetState, arg2) => {
                    additionalParameter = arg2
                }
                thunk1Dispatch(innerAction)
            }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            let thunk1 = dispatch.getCall(0).args[0]

            thunk1(dispatch, () => rootState, "ignored")

            let thunk2 = dispatch.getCall(1).args[0]

            thunk2(dispatch, () => rootState, "test")

            expect(additionalParameter).to.equal("test")
        })

        it('should not modify unknown namespaced action formats', () => {
            let dispatch = sinon.spy()
            let state = { value: "test" }
            let action = { value: "I have no type!" }
            namespacedDispatch(dispatch, () => state, 'customNamespace')(action)

            expect(dispatch).to.have.been.calledWith(action)
        })
    })

    describe('namespacedReducer Tests', () => {

        const initialState = "initial state"
        const testReducer = (state = initialState, action) => {
            switch (action.type) {
                case "CHANGE_STATE":
                    return action.newValue
                default:
                    return state
            }
        }
        const wrappedReducer = namespacedReducer(testReducer, "testing")

        it('should get initial state from wrapped reducer', () => {
            let action = { type: "INIT" }
            let newState = wrappedReducer(undefined, action)
            expect(newState).to.equal('initial state')
        })

        it('should ignore action without provided namespace', () => {
            let action = { type: "CHANGE_STATE", newValue: "new state" }
            let newState = wrappedReducer(initialState, action)
            expect(newState).to.equal('initial state')
        })

        it('should forward action with provided namespace', () => {
            let action = { type: "testing/CHANGE_STATE", newValue: "new state" }
            let newState = wrappedReducer(initialState, action)
            expect(newState).to.equal('new state')
        })

        it('should forward global actions', () => {
            let action = { type: "CHANGE_STATE", newValue: "new state", globalAction: true }
            let newState = wrappedReducer(initialState, action)
            expect(newState).to.equal('new state')
        })
    })
})
