import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'
const slice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
    loading: false,
    error: false,
  },
  reducers: {
    callBegan: (comment, action) => {
      comment.error = null
      comment.loading = true
    },
    callFailed: (comment, action) => {
      comment.loading = false
    },
    commentLoaded: (comment, action) => {
      comment.list = action.payload
      comment.loading = false
    },
    commentAdded: (comment, action) => {
      comment.list.unshift(action.payload)
      comment.loading = false
    },
    commentEdited: (comment, action) => {
      for (let i = 0; i < comment.list.length; i++) {
        if (comment.list[i]._id === action.payload._id) {
          comment.list[i] = action.payload
          break
        }
      }
      comment.loading = false
    },
    commentLiked: (comment, action) => {
      comment.loading = false
      for (let i = 0; i < comment.list.length; i++) {
        if (comment.list[i]._id === action.payload._id) {
          comment.list[i].likes = action.payload.likes
          break
        }
      }
    },
    replyLiked: (comment, action) => {
      comment.loading = false
      let motherComment
      //searching for mother comment
      for (let i = 0; i < comment.list.length; i++) {
        if (comment.list[i]._id === action.payload.comment) {
          motherComment = comment.list[i]
          break
        }
      }
      //updating reply likes
      for (let i = 0; i < motherComment.comments.length; i++) {
        if (motherComment.comments[i]._id === action.payload._id) {
          motherComment.comments[i].likes = action.payload.likes
        }
      }
    },
    commentReseted: (comment, action) => {
      comment.list = []
      comment.loading = false
      comment.error = false
    },
  },
})

export default slice.reducer

const actions = slice.actions
const url = '/comment'

export const loadComment = (id) =>
  apiCallBegan({
    url: `${url}/post/${id}`,
    onStart: actions.callBegan.type,
    onSuccess: actions.commentLoaded.type,
    onError: actions.callFailed.type,
  })

export const loadReplies = (id) =>
  apiCallBegan({
    url: `${url}/replies/${id}`,
    onStart: actions.callBegan.type,
    onSuccess: actions.commentEdited.type,
    onError: actions.callFailed.type,
  })

export const addComment = (comment) =>
  apiCallBegan({
    url: `${url}/post`,
    method: 'post',
    data: comment,
    onStart: actions.callBegan.type,
    onSuccess: actions.commentAdded.type,
    onError: actions.callFailed.type,
  })

export const reply = (comment) =>
  apiCallBegan({
    url: `${url}/comment`,
    method: 'post',
    data: comment,
    onStart: actions.callBegan.type,
    onSuccess: actions.commentEdited.type,
    onError: actions.callFailed.type,
  })

export const likeComment = (idComment) =>
  apiCallBegan({
    url: `${url}/like`,
    method: 'put',
    data: idComment,
    onSuccess: actions.commentLiked.type,
  })

export const likeReply = (idReply) =>
  apiCallBegan({
    url: `${url}/like`,
    method: 'put',
    data: idReply,
    onSuccess: actions.replyLiked.type,
  })

export const editComment = (comment) =>
  apiCallBegan({
    url,
    method: 'put',
    data: comment,
    onStart: actions.callBegan.type,
    onSuccess: actions.commentEdited.type,
    onError: actions.callFailed.type,
  })

export const resetCommentSection = actions.commentReseted
