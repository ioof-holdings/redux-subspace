import { asGlobal } from '../../../lib'

export const reset = () => {
    return asGlobal({type: "RESET"})
}