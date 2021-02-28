import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'
import decode from 'jwt-decode'
import { setJWT } from '../../services/http'
import { useReducer } from 'react'
const tokenKey = 'token'

const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },

  reducers: {
    callBegan: (user, action) => {
      user.error = null
      user.loading = true
    },
    callFailed: (user, action) => {
      user.loading = false
      user.error = action.payload
    },
    userLoggedIn: (user, action) => {
      user.loading = false
      localStorage.setItem(tokenKey, action.payload)
      user.userInfo = getCurrentUser()
      setJWT(getJWT())
    },
    userExited: (user, action) => {
      localStorage.removeItem(tokenKey)
      user.userInfo = null
    },
    userLoaded: (user, action) => {
      user.userInfo = getCurrentUser()
      setJWT(getJWT())
    },
    userLoadedById: (user, action) => {
      user.userInfo = action.payload
    },
    userUpdated: (user, action) => {
      user.userInfo = action.payload
      user.loading = false
      user.error = null
    },
  },
})

export default slice.reducer

const actions = slice.actions

export const login = (data) =>
  apiCallBegan({
    url: '/authentication/login',
    method: 'post',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userLoggedIn.type,
    onError: actions.callFailed.type,
  })

export const register = (data) =>
  apiCallBegan({
    url: '/authentication/register',
    method: 'post',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userLoggedIn.type,
    onError: actions.callFailed.type,
  })

export const logout = () => actions.userExited()

export const loadUser = () => actions.userLoaded()
// auth functions
const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return decode(jwt)
  } catch (e) {
    return null
  }
}

const getJWT = () => {
  return localStorage.getItem(tokenKey)
}

// user management
export const loadUserById = (id) =>
  apiCallBegan({
    url: `/user/${id}`,
    onstart: actions.callBegan.type,
    onSuccess: actions.userLoadedById.type,
    onError: actions.callFailed.type,
  })

export const updateAccount = (data) =>
  apiCallBegan({
    url: '/user/account',
    method: 'put',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userUpdated.type,
    onError: actions.callFailed.type,
  })

export const updatePassword = (data) =>
  apiCallBegan({
    url: '/user/password',
    method: 'put',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userUpdated.type,
    onError: actions.callFailed.type,
  })

export const updateProfile = (data) =>
  apiCallBegan({
    url: '/user/profile',
    method: 'put',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userUpdated.type,
    onError: actions.callFailed.type,
  })

export const updateImage = (data) =>
  apiCallBegan({
    url: '/user/img',
    method: 'put',
    data,
    onStart: actions.callBegan.type,
    onSuccess: actions.userUpdated.type,
    onError: actions.callFailed.type,
  })
