export const SHOW = 'SHOW'
export const HIDE = 'HIDE'


export function showSnackBar(message, severity) {
    return  {
        type: SHOW,
        payload: { message, severity }
    }
}


export function hideSnackBar () {
    return {
        type: HIDE
    }
}