import axios from '../../../axios'

export const CATEGORY = 'CATEGORY'
export const ADDCATEGORY = 'ADDCATEGORY'
export const DELETECATEGORY = 'DELETECATEGORY'
export const UPDATECATEGORY = 'UPDATECATEGORY'

export function getAllCategory() {
    return (dispatch) => {
        axios.get('api/category').then((res) => {
            dispatch({
                type: CATEGORY,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function addNewCategory(data) {
    return (dispatch) => {
        axios.post('api/category/add', {
            name: data.name,
            description: data.description
        }).then((res) => {
            dispatch(getAllCategory())
            dispatch({
                type: ADDCATEGORY,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function deleteCategory(id){
    return(dispatch) => {
        axios.delete(`api/category/${id}`).then((res) => {
            dispatch(getAllCategory());
            dispatch({
                type: DELETECATEGORY,
                payload: res.data
            }).catch((error) => {
                console.log(error.response.data.errors[0].msg)
            })
        })
    }
}

export function updateCategory(id, data){
    return (dispatch) => {
        axios.patch(`api/category/${id}`, {
            name: data.name,
            description: data.description
        }).then((res) => {
            dispatch(getAllCategory())
            dispatch({
                type: UPDATECATEGORY,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}