import axios from 'axios'

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
      ? true
      : false

  if (!expectedError) {
    console.log('Unexpected Error :', error)
    alert('Unexpected Error')
  }

  return Promise.reject(error)
})

export const setJWT = (jwt) => {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

export default axios
