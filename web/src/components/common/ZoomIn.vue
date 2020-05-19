<template>
  <div class="zoomin">
    <div class="column" v-if="downloadName=='一级维度'">
      <span class="title">一级维度</span>
    </div>
    <div class="draw" id="zoomIds" :style="{ height: '97%'}"></div>
    <!--<img @click="cameraClick" class="camera-btn" src="../../assets/img/icon-camera.png"/>-->
    <img @click="zoomOutClick" class="zoom-btn" src="../../assets/img/icon-zoom-out.png"/>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
    export default {
      name: "zoom-in",
      props:['downloadName'],
      data () {
        return {
        }
      },
      watch:{
        'downloadName': function () {
         // console.log(this.downloadName);
        },
      },
      mounted(){
        var that=this;
      // this.$toast(navigator.userAgent);
        if(that.isSogou()){
          $(".zoomin").css("width","91.5vh");
        }
        if(that.isUBrowser()){
          $(".zoomin").css("width","90vh");
        }
        if(that.isSafari()){
          $(".zoomin").css("width","88vh");
        }
        if(that.isQQ()){
          $(".zoomin").css("width","86.5vh");
        }
        if(that.isOPPO()){
          $(".zoomin").css("width","85vh");
        }
        if(that.isAndroid()&&that.isWeiXin()){
          $(".zoomin").css("width","100vh");
        }
      },
      methods:{
          isAndroid(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
              return true;
            }else{
              return false;
            }
          },
          isWeiXin(){
          var ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
          }else{
            return false;
          }
        },
        isSafari(){
          var ua = navigator.userAgent.toLowerCase();
          if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
            ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
            ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
            return true;
          }else{
            return false;
          }
        },
        isUBrowser(){
          if(navigator.userAgent.indexOf("UCBrowser")>-1){
            return true;
          }else {
            return false;
          }
        },
        isQQ(){
          if(navigator.userAgent.indexOf("QQBrowser")>-1){
            return true;
          }else {
            return false;
          }
        },
        isOPPO(){
          if(navigator.userAgent.indexOf("HeyTapBrowser")>-1){
            return true;
          }else {
            return false;
          }
        },
        isSogou(){
          if(navigator.userAgent.indexOf("Sogou")>-1){
            return true;
          }else {
            return false;
          }
        },
        zoomOutClick(){
          // childByValue是在父组件on监听的方法
          // 第二个参数this.childValue是需要传的值
          this.$emit('isShowZoomOut', false);
          $(".draw.small").fadeIn();

        },
        cameraClick(){
          var that=this;
          // var mycanvas = $("#zoomIds").find("canvas")[0];
          // var image = mycanvas.toDataURL("image/png");
          // var $a = document.createElement('a');
          // $a.setAttribute("href", image);
          // $a.setAttribute("download", that.downloadName);
          // $a.click();

          var mycanvas = $("#zoomIds").find("canvas")[0];
          var canvasToImage = mycanvas.toDataURL("image/png");
          var image=new Image();
           image.src=canvasToImage;
           image.id="zoomImage";
           document.body.appendChild(image);
          var cloneDom=$("body #zoomImage");
          setTimeout(function () {
            html2canvas(cloneDom[0],{
              useCORS: true,
            }).then(canvas => {
              var pageData = canvas.toDataURL('image/png');
             // console.log(pageData);
              that.saveFile(pageData.replace("image/png", "image/octet-stream"), that.downloadName + ".png");
            });
          },100);
        },
        /**
         * 在本地进行文件保存
         * @param  {String} data     要保存到本地的图片数据
         * @param  {String} filename 文件名
         */
        saveFile(data,filename){
          var that=this;
          var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = data;
          save_link.download = filename;
          var event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);
          save_link.dispatchEvent(event);
          $("body #zoomImage").remove();
        },

      }
    }
</script>

<style lang="scss" scoped>
.zoomin{
  transform: rotate(90deg);
  transform-origin:50vw 50vw;
  -ms-transform: rotate(90deg); /* IE 9 */
  -ms-transform-origin:50vw 50vw; /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -webkit-transform-origin:50vw 50vw; /* Safari and Chrome */
  width: 100vh;
  height: 100vw;
  overflow-x: scroll;
  overflow-y: scroll;
  .column{
    z-index: 1;
    position: absolute;
    top: 30px;
    width: 100%;
    height: 65px;
    line-height: 65px;
    .title{
      position: absolute;
      left: 30px;
      font-weight: bold;
      font-size:26px;
      display: inline-block;
    }
    .btn-box{
      width: 300px;
      position: absolute;
      right: 0;
      left: 0;
      margin: auto;
      text-align: center;
      display: inline-block;
      border-radius: 5px;
      .btn{
        font-weight: bold;
        width: 150px;
        display: inline-block;
        background-color: #f9f9f9;
        color: #000000;
        font-size: 26px;
      }
      .btn:nth-child(1){
        float: left;
      }
      .btn:nth-child(2){
        float: right;
      }
      .btn.active{
        background-color: #fabe00;

      }
    }
  }
  .draw{
    background-color: white;
    position: relative;
    width: 98%;
    left: 0;
    right: 0;
    bottom: -1.5%;
    margin: auto;
    border-radius: 5px;
  }
  .zoom-btn{
    position: absolute;
    z-index: 2;
    right: 30px;
    top: 30px;
    width: 60px;
  }
  .camera-btn{
    position: absolute;
    right: 140px;
    top: 30px;
    width: 60px;
  }
}
</style>
