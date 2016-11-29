const initialState = "store value"

export default (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_VALUE":
            return "new value"
        default:
            return state
    }
}