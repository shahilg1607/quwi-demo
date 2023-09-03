export const getAllProjects = (state) => {
  return state.projects
}

export const getProjectDetail = (state) => (projectId) => {
  return state.projects.find((project) => project.id === projectId)
}
