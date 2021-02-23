import http from '../../services/http'
import * as actions from '../api'
import { apiDev, apiProd } from '../../config.json'

const apiUrl = apiDev

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action)
  const { url, method, data, onStart, onSuccess, onError } = action.payload

  if (onStart)
    dispatch({
      type: onStart,
    })
  next(action)
  try {
    const response = await http.request({
      baseURL: apiUrl,
      url,
      method,
      data,
    })
    dispatch(actions.apiCallSuccess(response.data))
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: response.data,
      })
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message))
    if (onError)
      dispatch({
        type: onError,
        payload: error.response ? error.response.data : 'unexpected error',
      })
  }
}

export default api
