import axios from '../../../axios'


export const CATEGORY = 'CATEGORY'


export function getAllCategory() {
    return (dispatch) => {
        axios.get('api/category').then((res) => {
            dispatch({
                type: CATEGORY,
                payload: res.data.allCategory
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}