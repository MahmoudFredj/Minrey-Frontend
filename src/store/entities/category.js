import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'

const slice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    loading: false,
  },

  reducers: {
    callBegan: (category, action) => {
      category.loading = true
    },
    callFailed: (category, action) => {
      category.loading = false
    },
    categoryLoaded: (category, action) => {
      category.loading = false
      category.list = action.payload
    },
    categoryAdded: (category, action) => {
      category.loading = false
      category.list.unshift(action.payload)
    },
    categoryUpdated: (category, action) => {
      category.loading = false
      category.list.map(
        (category) => category._id === action.payload._id && action.payload,
      )
    },
    categoryRemoved: (category, action) => {
      category.loading = false
      for (let i = 0; i < category.list.length; i++) {
        if (category.list[i]._id === action.payload._id) {
          category.list.splice(i, 1)
          break
        }
      }
    },
  },
})

export default slice.reducer

const url = '/category'

const actions = slice.actions

export const loadCategory = () =>
  apiCallBegan({
    url,
    onStart: actions.callBegan.type,
    onSuccess: actions.categoryLoaded.type,
    onError: actions.callFailed.type,
  })

export const addCategory = (category) =>
  apiCallBegan({
    url,
    method: 'post',
    data: category,
    onStart: actions.callBegan.type,
    onSuccess: actions.categoryAdded.type,
    onError: actions.callFailed.type,
  })

export const editCategory = (category) =>
  apiCallBegan({
    url,
    method: 'put',
    data: category,
    onStart: actions.callBegan.type,
    onSuccess: actions.categoryUpdated.type,
    onError: actions.callFailed.type,
  })

export const removeCategory = (category) =>
  apiCallBegan({
    url,
    method: 'delete',
    data: category,
    onStart: actions.callBegan.type,
    onSuccess: actions.categoryRemoved.type,
    onError: actions.callFailed.type,
  })
