import { GlobalActions } from '../../../src'

GlobalActions.register("TEST_ACTION_1").register("TEST_ACTION_2")

const action = { type: "TEST_ACTION" }

const isGlobal = GlobalActions.isGlobal(action)