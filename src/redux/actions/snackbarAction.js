export const SHOW = 'SHOW'
export const HIDE = 'HIDE'


export function showSnackBar(data) {
    return  {
        type: SHOW,
        data
    }
}


export function hideSnackBar () {
    return {
        type: HIDE
    }
}