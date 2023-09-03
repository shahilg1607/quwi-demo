export const addNotification = ({ commit }, notification) => {
  commit('setNotification', notification)
}

export const resetNotification = ({ commit }) => {
  commit('removeNotification')
}
