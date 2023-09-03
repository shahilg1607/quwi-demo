import { axios } from '~/plugins/axios'

const authentication = {
  login: async (credential) => {
    return await axios.$post('auth/login', credential)
  },

  logout: async () => {
    return await axios.$post('auth/logout', { anywhere: true })
  },
}

export default authentication
