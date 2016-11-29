export const changeValue = () => {
    return (dispatch) => {
        dispatch({type: "CHANGE_VALUE"})
    }
}