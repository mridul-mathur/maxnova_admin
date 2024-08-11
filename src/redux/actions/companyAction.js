import axios from '../../../axios'

export const COMPANY = 'COMPANY'
export const ADDCOMPANY = 'ADDCOMPANY'
export const DELETECOMPANY = 'DELETECOMPANY'

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


export function addNewCompany(data) {
    return (dispatch) => {
        axios.post('api/company/add', data).then((res) => {
            dispatch(getAllCompany());
            dispatch({
                type: ADDCOMPANY,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function deleteCompany(id){
    return(dispatch) => {
        axios.delete(`api/company/${id}`).then((res) => {
            dispatch(getAllCompany());
            dispatch({
                type: DELETECOMPANY,
                payload: res.data
            }).catch((error) => {
                console.log(error.response.data.errors[0].msg)
            })
        })
    }
}