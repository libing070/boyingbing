const baseSize = 32
// 设置 rem 函数
function setRem () {

  if(document.documentElement.clientWidth<1024){//移动端
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小（计算结果是以iphone6/7/8 (html font-size: 16px;)
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  }else{//PC端
    var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
    var rem = document.documentElement.clientWidth * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    document.documentElement.style.fontSize = rem + "px"; //适用于PC网站

  }

}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
