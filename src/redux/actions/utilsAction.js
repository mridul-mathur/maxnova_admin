import axios from '../../../axios'

export const PATCHHOMEUTIL = 'PATCHHOMEUTIL'
export const GETHOMEUTIL = 'GETHOMEUTIL'
export const UPDATEPCDUTIL = 'UPDATEPCDUTIL'
export const GETPCDUTIL = 'GETPCDUTIL'
export const UPDATEPVTUTIL = 'UPDATEPVTUTIL'
export const GETPVTUTIL = 'GETPVTUTIL'
export const UPDATECUSTOMUTIL = 'UPDATECUSTOMUTIL'
export const GETCUSTOMUTIL = 'GETCUSTOMUTIL'


export function updateHomeUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-home/${id}`, data).then((res) => {
            dispatch(getHomeUtil())
            dispatch({
                type: PATCHHOMEUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function getHomeUtil() {
    return (dispatch) => {
        axios.get('/api/utils/get-home').then((res) => {
            dispatch({
                type: GETHOMEUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function updatePcdUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-pcd/${id}`, data).then((res) => {
            dispatch(getPcdUtil())
            dispatch({
                type: UPDATEPCDUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function getPcdUtil() {
    return (dispatch) => {
        axios.get('/api/utils/get-pcd').then((res) => {
            dispatch({
                type: GETPCDUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function updatePvtUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-pvt/${id}`, data).then((res) => {
            dispatch(getPvtUtil())
            dispatch({
                type: UPDATEPVTUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function getPvtUtil() {
    return (dispatch) => {
        axios.get('/api/utils/get-pvt').then((res) => {
            dispatch({
                type: GETPVTUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}


export function updateCustomUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-custom/${id}`, data).then((res) => {
            dispatch(getCustomUtil())
            dispatch({
                type: UPDATECUSTOMUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}

export function getCustomUtil() {
    return (dispatch) => {
        axios.get('/api/utils/get-custom').then((res) => {
            dispatch({
                type: GETCUSTOMUTIL,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
        })
    }
}




