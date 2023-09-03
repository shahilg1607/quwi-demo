import { axios } from '~/plugins/axios'

const projects = {
  fetchProjects: async () => {
    return await axios.$get('projects-manage/index', {
      params: {
        filters: {
          is_active: 1,
        },
        sort: 'dta_create',
      },
    })
  },

  updateProject: async (projectDetail, id) => {
    return await axios.$post(`projects-manage/update?id=${id}`, projectDetail)
  },
}

export default projects
