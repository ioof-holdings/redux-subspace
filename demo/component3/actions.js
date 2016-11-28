const changeValue = () => {
    return {type: "CHANGE_VALUE"}
}

const firstChange = (rootValue) => {
    return {type: "FIRST_CHANGE", rootValue}
}

const secondChange = () => {
    return {type: "SECOND_CHANGE"}
}

const delayedSecondChange = () => {
    return dispatch => {
        dispatch(secondChange())
    }
}

export const delayedChangeValue = () => {
    return dispatch => { 
        return dispatch(changeValue())
    }
}

export const nestedChangeValue = () => {
    return (dispatch, getState) => { 
        dispatch(firstChange(getState().root.configuration.BACK_END))
        dispatch(delayedSecondChange())
    }
}