import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'
const slice = createSlice({
  name: 'post',
  initialState: {
    list: [],
    one: null,
    loading: false,
    error: null,
    full: false,
  },
  reducers: {
    callBegan: (post, action) => {
      post.error = null
      post.loading = true
    },
    callFailed: (post, action) => {
      post.loading = false
      post.error = action.payload
    },
    listCleared: (post, action) => {
      post.list = []
    },
    postLoaded: (post, action) => {
      post.loading = false
      if (action.payload.length === 0) {
        post.full = true
        return
      }
      if (post.list.length === 0) {
        post.list = action.payload
      } else {
        for (let i = 0; i < action.payload.length; i++) {
          post.list.push(action.payload[i])
        }
      }
      post.full = false
    },
    onePostLoaded: (post, action) => {
      post.loading = false
      post.one = action.payload
    },
    postAdded: (post, action) => {
      post.loading = false
      post.list.unshift(action.payload)
    },
    postEdited: (post, action) => {
      post.loading = false
      for (let i = 0; i < post.list.length; i++) {
        if (post.list[i]._id === action.payload._id) {
          post.list[i] = action.payload
          break
        }
      }
    },
    postLiked: (post, action) => {
      post.loading = false
      if (post.one && post.one._id === action.payload._id) {
        post.one.likes = action.payload.likes
        return
      }
      for (let i = 0; i < post.list.length; i++) {
        if (post.list[i]._id === action.payload._id) {
          post.list[i].likes = action.payload.likes
          break
        }
      }
    },
    postDeleted: (post, action) => {
      post.loading = false

      for (let i = 0; i < post.list.length; i++) {
        if (post.list[i]._id === action.payload._id) {
          post.list.splice(i, 1)
          break
        }
      }
    },
  },
})

export default slice.reducer

const actions = slice.actions

const url = '/post'
export const clearList = () => actions.listCleared()
export const loadPost = (pageNumber, pageSize) =>
  apiCallBegan({
    url: `${url}/${pageNumber}/${pageSize}`,
    onStart: actions.callBegan.type,
    onSuccess: actions.postLoaded.type,
    onError: actions.callFailed.type,
  })

export const loadPostWithCategory = (id, pageNumber, pageSize) =>
  apiCallBegan({
    url: `${url}/${id}/${pageNumber}/${pageSize}`,
    onStart: actions.callBegan.type,
    onSuccess: actions.postLoaded.type,
    onError: actions.callFailed.type,
  })

export const loadOnePost = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    onStart: actions.callBegan.type,
    onSuccess: actions.onePostLoaded.type,
    onError: actions.callFailed.type,
  })

export const addPost = (post) =>
  apiCallBegan({
    url,
    method: 'post',
    data: post,
    onStart: actions.callBegan.type,
    onSuccess: actions.postAdded.type,
    onError: actions.callFailed.type,
  })

export const likePost = (postId) =>
  apiCallBegan({
    url: `${url}/like`,
    method: 'put',
    data: postId,
    onSuccess: actions.postLiked.type,
    onError: actions.callFailed.type,
  })

export const deletePost = (post) =>
  apiCallBegan({
    url,
    method: 'delete',
    data: post,
    onStart: actions.callBegan.type,
    onSuccess: actions.postDeleted.type,
    onError: actions.callFailed.type,
  })
