import { Action } from 'redux'
import { makeGlobal } from '../../../src'

const action = { type: "TEST_ACTION" }

const globalAction = makeGlobal(action)