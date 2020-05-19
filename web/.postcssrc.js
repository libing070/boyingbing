// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 32,//以750设计稿的根元素字体大小为准 iphone6/7/8 (html font-size: 16px;)
      propList: ['*'],
      //使用vue移动端框架vantUi 根字体是37.5 和默认根字体不一致，导致组件样式变小
      selectorBlackList:['van']//过滤掉以van开头的样式
    }
  }
}
