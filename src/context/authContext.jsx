import { useEffect } from 'react'

import { createContext, useReducer } from 'react'
import axios from '../../axios'
import { showSnackBar } from 'src/redux/actions/snackbarAction'

const initialState = {
    isAuthenticated: false,
    username: null
}

const setSession = (accessToken, username) => {
    if (accessToken, username) {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('username', username)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('username')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const { isAuthenticated, username } = action.payload
            return {
                ...state,
                isAuthenticated: isAuthenticated,
                username: username
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                username: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = (username, password) => {
        axios.post('api/login/', {
            username: username,
            password: password,
        }).then((res) => {
            const token = res.data.token
            const username = res.data.checkUser[0].username
            setSession(token, username)
            dispatch({
                type: 'LOGIN',
                payload: {
                    isAuthenticated: true,
                    username: username
                }
            })
        }).catch((error) => {
            console.log(error.response.data.errors[0].msg)
            dispatch(showSnackBar({ severity: 'alert', message: "ibio" }))
        })
    }


    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        try {
            const accessToken = window.localStorage.getItem('accessToken')
            const username = window.localStorage.getItem('username')
            if (accessToken && username) {
                setSession(accessToken, username)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        isAuthenticated: true,
                        username: username,
                    },
                })
            } else {
                dispatch({
                    type: 'LOGOUT',
                    payload: {
                        isAuthenticated: false,
                        username: null,
                    },
                })
            }
        } catch (err) {
            dispatch({
                type: 'LOGOUT',
                payload: {
                    isAuthenticated: false,
                    username: null,
                },
            })
        }
    }, [])


    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
