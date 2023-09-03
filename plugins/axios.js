let axiosClient

export default ({ $axios, redirect }) => {
  if (process.client) {
    $axios.setBaseURL(process.env.baseUrl)

  }

  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${localStorage.getItem(
      'token'
    )}`
  })

  $axios.onError((error) => {
    if ([401, 403].includes(error.response.status)) {
      localStorage.removeItem('token');
      redirect('/login')
    }
  })

  axiosClient = $axios
}

/**
 * Export as service when $axios is set
 * Reference: https://github.com/nuxt-community/axios-module/issues/28
 */
export const axios = [
  '$request',
  '$delete',
  '$get',
  '$head',
  '$options',
  '$post',
  '$put',
  '$patch',
].reduce((acc, method) => {
  acc[method] = function () {
    if (!axiosClient) throw new Error('Nuxt Axios not yet loaded')
    return axiosClient[method].apply(null, arguments)
  }
  return acc
}, {})
