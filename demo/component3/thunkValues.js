const initialState = {
    value1: "initial values",
    value2: "value from store"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "FIRST_CHANGE":
            return { ...state, value1: `could use ${action.rootValue} to get` }
        case "SECOND_CHANGE":
            return { ...state, value2: "new value from thunk" }
        default:
            return state
    }
}