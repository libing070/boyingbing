const baseSize = 32
// 设置 rem 函数
function setRem () {

  if(document.documentElement.clientWidth<1024){//移动端
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小（计算结果是以iphone6/7/8 (html font-size: 16px;)
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  }else{//PC端
    deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + (deviceWidth / 19.2/100) + 'px !important'

  }

}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
