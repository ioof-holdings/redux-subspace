
export const READY_TO_CHANGE_VALUE = 'READY_TO_CHANGE_VALUE';

export const changeValue = () => {
    return {
        type: "CHANGE_VALUE"
    }
}

export const readyToChangeValue = () => {
    return {
        type: READY_TO_CHANGE_VALUE
    }
}
