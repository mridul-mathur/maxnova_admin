import axios from '../../../axios'


export const PRODUCT = 'PRODUCT'
export const ADDPRODUCT = 'ADDPRODUCT'
export const DELETEPRODUCT = 'DELETEPRODUCT'
export const UPDATEPRODUCT = 'UPDATEPRODUCT'

export function getAllProducts() {
    return (dispatch) => {
        axios.get('api/product').then((res) => {
            dispatch({
                type: PRODUCT,
                payload: res.data.findProduct
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function addNewProduct(productDetails) {
    return (dispatch) => {
        axios.post('api/product/add', productDetails).then((res) => {
            dispatch(getAllProducts())
            dispatch({
                type: ADDPRODUCT,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function deleteProduct(id){
    return (dispatch) => {
        axios.delete(`api/product/${id}`).then((res) => {
            dispatch(getAllProducts())
            dispatch({
                type: DELETEPRODUCT,
                payload: res.data
            })
        }).catch((error)=>{
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function updateProduct(id, data){
    return (dispatch) => {
        axios.patch(`api/product/${id}`, data).then((res) => {
            dispatch(getAllProducts())
            dispatch({
                type: UPDATEPRODUCT,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}
