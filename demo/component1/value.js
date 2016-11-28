const initialState = "store value"

export default (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_VALUE":
            return "new value"
        case "GLOBAL_ACTION":
            return "global value"
        default:
            return state
    }
}