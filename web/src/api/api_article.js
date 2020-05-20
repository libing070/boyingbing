import * as API from './'

export default {

  //查询获取goods列表
  findListById: params => {
    return API.GET('/api/v1/article/'+params.id)
  },
  //查询获取所有
  allList: () => {
    return API.GET('/api/v1/article')
  },
}
