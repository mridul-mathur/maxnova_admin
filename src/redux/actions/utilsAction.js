import axios from '../../../axios'

export const HOMEUTIL = 'HOMEUTIL'

export function updateHomeUtil(id, data){
    return (dispatch) => {
        axios.patch(`/api/utils/patch-home/${id}`, data).then((res) => {
            dispatch({
                type: HOMEUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}
