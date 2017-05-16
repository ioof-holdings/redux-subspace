import { Action } from 'redux'
import { asGlobal } from '../../../src'

const action = { type: "TEST_ACTION" }

const globalAction = asGlobal(action)