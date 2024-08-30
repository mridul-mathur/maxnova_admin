import axios from '../../../axios'
import { showSnackBar } from './snackbarAction'

export const PATCHHOMEUTIL = 'PATCHHOMEUTIL'
export const GETHOMEUTIL = 'GETHOMEUTIL'
export const UPDATEPCDUTIL = 'UPDATEPCDUTIL'
export const GETPCDUTIL = 'GETPCDUTIL'
export const UPDATEPVTUTIL = 'UPDATEPVTUTIL'
export const GETPVTUTIL = 'GETPVTUTIL'
export const UPDATECUSTOMUTIL = 'UPDATECUSTOMUTIL'
export const GETCUSTOMUTIL = 'GETCUSTOMUTIL'
export const UPDATEABOUTUTIL = 'UPDATEABOUTUTIL'
export const GETABOUTUTIL = 'GETABOUTUTIL'

export const DELETECERTIFICATE = 'DELETECERTIFICATE'
export const ADDCERTIFICATE = 'ADDCERTIFICATE'
export const GETCERTIFICATE = 'GETCERTIFICATE'


export function updateHomeUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-home/${id}`, data).then((res) => {
            dispatch(getHomeUtil())
            dispatch({
                type: PATCHHOMEUTIL,
                payload: res.data
            })
            dispatch(showSnackBar('Updated Home Utils Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar('Updated PCD Utils Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar('Updated PVT Utils Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar('Updated Custom Formulatils Utils Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
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
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}

export function updateAboutUtil(id, data) {
    return (dispatch) => {
        axios.patch(`/api/utils/patch-about/${id}`, data).then((res) => {
            dispatch(getAboutUtil())
            dispatch({
                type: UPDATEABOUTUTIL,
                payload: res.data
            })
            dispatch(showSnackBar('Updated About Utils Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}

export function getAboutUtil() {
    return (dispatch) => {
        axios.get('/api/utils/get-about').then((res) => {
            dispatch({
                type: GETABOUTUTIL,
                payload: res.data
            })
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}


export function getCertificates() {
    return (dispatch) => {
        axios.get(`/api/utils/get-certificate`).then((res) => {
            dispatch({
                type: GETCERTIFICATE,
                payload: res.data
            })
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}

export function deleteCertificate(id) {
    return (dispatch) => {
        axios.delete(`/api/utils/delete-certificate/${id}`).then((res) => {
            dispatch(getCertificates())
            dispatch({
                type: DELETECERTIFICATE,
                payload: res.data
            })
            dispatch(showSnackBar('Deleted Certificate Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}

export function addCertificate(data) {
    return (dispatch) => {
        axios.post(`/api/utils/add-certificate`, data).then((res) => {
            dispatch(getCertificates())
            dispatch({
                type: ADDCERTIFICATE,
                payload: res.data
            })
            dispatch(showSnackBar('Added New Certificate Successfully!', 'success'))
        }).catch((error) => {
            dispatch(showSnackBar(error.response.data.errors[0].msg, 'error'))
        })
    }
}

