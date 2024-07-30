import axios from '../../../axios'


export const COMPANY = 'COMPANY'


export function getAllCompany() {
    return (dispatch) => {
        axios.get('api/company').then((res) => {
            dispatch({
                type: COMPANY,
                payload: res.data.allCompany
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}