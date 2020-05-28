import * as API from './'

export default {

  // //查询获取goods列表
  // findListById: params => {
  //   return API.GET('/api/v1/article/'+params.id)
  // },
  // //查询获取所有
  // allList: () => {
  //   return API.GET('/api/v1/article')
  // },
  //创建
  create: (params) => {
    return API.POST('/api/v1/photos/create',params)
  },
}
