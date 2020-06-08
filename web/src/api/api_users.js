import * as API from './'

export default {
  create: (params) => {
    return API.POST('/api/v1/users/create',params)
  },
  login: (params) => {
    return API.POST('/api/v1/users/login',params)
  },
  users: (params) => {
    return API.GET('/api/v1/users/'+params.id)
  },
}
