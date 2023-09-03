import authentication from '~/services/authentication'

export const login = async ({ dispatch }, credential) => {
  try {
    const userDetail = await authentication.login(credential)
    localStorage.setItem('token', userDetail.token)
  } catch (error) {
    if (error.response?.status === 417) {
      dispatch(
        'toaster/addNotification',
        {
          message: error.response?.data?.first_errors?.email,
        },
        { root: true }
      )
    }
  }
}

export const logout = async ({ dispatch }) => {
  try {
    await authentication.logout()
    localStorage.removeItem('token')
  } catch (error) {
    dispatch(
      'toaster/addNotification',
      {
        message: 'Something went wrong. Please try again.',
      },
      { root: true }
    )
  }
}
