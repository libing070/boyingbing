import * as API from './'

export default {
  //创建
  create: (params) => {
    return API.POST('/api/v1/accesslog/create',params)
  },
}
