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

        it('should raise error if mapState returns undefined', () => {
            let state = {
                "key": "wrong"
            }

            expect(() => getSubState(() => state, state => state.missing)())
                .to.throw('mapState must not return undefined.')
        })
    })
})