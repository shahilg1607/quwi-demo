import projects from '~/services/projects'

export const fetchProjects = async ({ commit }) => {
  try {
    const response = await projects.fetchProjects()
    commit('setProjects', response.projects)
  } catch (error) {
    console.error(error)
  }
}

export const manageProject = async ({ dispatch }, projectDetail) => {
  try {
    const payload = {
      name: projectDetail.name,
      position: projectDetail.position,
    }
    await projects.updateProject(payload, projectDetail.id)
    await dispatch('fetchProjects')
  } catch (error) {
    console.error(error)
  }
}
