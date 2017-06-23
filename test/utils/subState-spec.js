/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getSubState } from '../../src/utils/subState'

describe('subState Tests', () => {
    describe('getSubState', () => {
        it('should create sub-state', () => {
            let state = {
                state1: {
                    key: 'expected'
                },
                state2: {
                    key: 'wrong'
                }
            }

            let rootState = state

            let subState = getSubState(() => state, () => rootState, state => state.state1)()

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
                }
            }

            let rootState = {
                states: {
                        state1: {
                            key: 'expected'
                        },
                        state2: {
                            key: 'wrong'
                        }
                    }
            }

            let subState = getSubState(() => state, () => rootState, state => state.state1)()

            expect(subState.key).to.equal('expected')
            expect(subState.root).to.equal(rootState)
        })

        it('should provide parent state as root state when mapping', () => {
            let state = {
                state1: {
                    key1: 1
                },
                state2: {
                    key2: 2
                }
            }

            let rootState = state

            let subState = getSubState(() => state, () => rootState, (state, rootState) => ({ ...state.state1, ...rootState.state2 }))()

            expect(subState.key1).to.equal(1)
            expect(subState.key2).to.equal(2)
            expect(subState.root).to.equal(state)
        })

        it('should provide root state as root state when mapping', () => {
            let state = {
                state1: {
                    key1: 1
                },
                state2: {
                    key2: 2
                }
            }

            let rootState = {
                    state1: {
                        key1: 3
                    },
                    state2: {
                        key2: 4
                    }
                }

            let subState = getSubState(() => state, () => rootState, (state, rootState) => ({ ...state.state1, ...rootState.state2 }))()

            expect(subState.key1).to.equal(1)
            expect(subState.key2).to.equal(4)
            expect(subState.root).to.equal(rootState)
        })

        it('should not modify sub-state if primitive value', () => {
            let state = {
                state1: 'expected',
                state2: 'wrong'
            }

            let rootState = state

            let subState = getSubState(() => state, () => rootState, state => state.state1)()

            expect(subState).to.equal('expected')
            expect(subState.root).to.be.undefined
        })

        it('should not modify sub-state if array value', () => {
            let state = {
                state1: ['expected'],
                state2: ['wrong']
            }

            let rootState = state

            let subState = getSubState(() => state, () => rootState, state => state.state1)()

            expect(subState).to.deep.equal(['expected'])
            expect(subState.root).to.be.undefined
        })

        it('should raise error if mapState returns undefined', () => {
            let state = {
                "key": "wrong"
            }

            let rootState = state

            expect(() => getSubState(() => state, () => rootState, state => state.missing)())
                .to.throw('mapState must not return undefined.')
        })

        it('should not raise error if mapState returns undefined in production', () => {
            let nodeEnv = process.env.NODE_ENV

            try {
                process.env.NODE_ENV = 'production'

                let state = {
                    "key": "wrong"
                }

                let rootState = state

                let subState = getSubState(() => state, () => rootState, state => state.missing)()

                expect(subState).to.be.undefined
            } finally {
                process.env.NODE_ENV = nodeEnv
            }
        })
    })
})