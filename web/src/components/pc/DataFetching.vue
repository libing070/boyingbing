<template>
  <div class="data-fetching">
    <h1 class="title">图片入库(https://unsplash.com/)</h1>
    <div class="type">
      <el-radio-group v-model="radioType" size="mini" fill="#3366cc" text-color="#ffffff" >
        <el-radio-button label="travel">travel</el-radio-button>
        <el-radio-button label="work-from-home">Work From Home</el-radio-button>
        <el-radio-button label="covid-19">COVID-19</el-radio-button>
        <el-radio-button label="nature">Nature</el-radio-button>
        <el-radio-button label="wallpapers">Wallpapers</el-radio-button>
        <el-radio-button label="textures-patterns">Textures & Patterns</el-radio-button>
        <el-radio-button label="people">People</el-radio-button>
        <el-radio-button label="business-work">Business & Work</el-radio-button>
        <el-radio-button label="technology">Technology</el-radio-button>
        <el-radio-button label="animals">Animals</el-radio-button>
        <el-radio-button label="interiors">Interiors</el-radio-button>
        <el-radio-button label="architecture">Architecture</el-radio-button>
        <el-radio-button label="food-drink">Food & Drink</el-radio-button>
        <el-radio-button label="current-events">Current Events</el-radio-button>
        <el-radio-button label="athletics">Athletics</el-radio-button>
        <el-radio-button label="spirituality">Spirituality</el-radio-button>
        <el-radio-button label="health">Health & Wellness</el-radio-button>
        <el-radio-button label="all">All</el-radio-button>
      </el-radio-group>
    </div>
    <div class="start-btn"><span @click="startExec">开始执行</span>&nbsp;&nbsp;<span @click="stopExec">暂停</span></div>
    <div class="desc"><span class="taking">已耗时：{{taking}}</span>&nbsp;&nbsp;<span class="sum">已入库：</span>{{pageNum-1}}条  &nbsp; &nbsp; &nbsp;<span>{{desc}}</span></div>
    <div class="wrap" style="overflow-y: scroll">
    </div>
  </div>
</template>

<script>
  import API from '../../api/api_photos';
  const request = require('request');
  export default {
        name: "data-fetching",
        data () {
        return {
          radioType: 'current-events',
          execUrl:'',
          desc:'',
          pageNum:1002,
          t1:0,
          data:{},
          taking:'',
          flag:true,
          time:0,
          h:0, m:0,s:0,ms:0//定义时，分，秒，毫秒并初始化为0；
        };
      },
      created(){


      },
      mounted() {

      },
       methods:{
          timer(){
            var that=this;
            that.ms=that.ms+50;         //毫秒
            if(that.ms>=1000){
              that.ms=0;
              that.s=that.s+1;         //秒
            }
            if(that.s>=60){
              that.s=0;
              that.m=that.m+1;        //分钟
            }
            if(that.m>=60){
              that.m=0;
              that.h=that.h+1;        //小时
            }
           var str =that.toDub(that.h)+"时"+that.toDub(that.m)+"分"+that.toDub(that.s)+"秒"+that.toDubms(that.ms)+"毫秒";
            that.taking=str;
          },
         toDub(n){//补0操作
           if(n<10){
             return "0"+n;
           }
           else {
             return ""+n;
           }
         },
         toDubms(n){  //给毫秒补0操作
           if(n<10){
             return "00"+n;
           }
           else {
             return "0"+n;
           }

         },
         stopExec(){
           var that=this;
           clearInterval(that.time);
            that.flag=false;
         },
         startExec(){
           var that=this;
           that.time=setInterval(that.timer,50);
           that.flag=true;
           that.writePhotos();
          },
          writePhotos(){
            let that = this;
           // that.loading = true;
            var params={
              type:that.radioType,
              url:'https://unsplash.com/napi/topics/'+that.radioType+'/photos?page='+that.pageNum+'&per_page=1'
            };
            API.create(params).then(function (result) {
              if (JSON.stringify(result.data) === '{}') {
                console.log("没数据了");
                that.desc='没有数据了';
                that.pageNum=1;
                window.clearInterval(that.time);
                window.clearInterval(that.t1);
              }else{
                if(that.flag){
                  that.pageNum++;
                 that.t1= window.setTimeout(that.writePhotos,1000);
                  var str='<p>'+result.data.ids+'------'+result.data.urlRaw+'</p>'
                  $(".wrap").prepend(str);
                }else{
                  clearInterval(that.t1);
                }


              }
            }, function (err) {
            //  that.loading = false;

              window.clearInterval(that.time);
              window.clearInterval(that.t1);
              setTimeout(function () {
                that.startExec();
              },1000*60);
            //  that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
            //  that.loading = false;
              console.log(error);
              window.clearInterval(that.time);
              window.clearInterval(that.t1);
              setTimeout(function () {
                that.startExec();
              },1000*60)
             // that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
      }
    }
</script>

<style lang="scss" scoped>
  .data-fetching{
    font-size: 5px;
    .title{
      text-align: center;
      margin: 10px 0;
    }
    .type{
      position: relative;
      width: 500px;
      margin: auto;
      text-align: center;
    }
    .start-btn{
      margin: 10px 0;
       position: relative;
       width: 100%;
       height: 15px;
      text-align: center;
      span{
        cursor: pointer;
        display: inline-block;
        width:50px;
        background-color: white;
        color: #000000;
        height: 100%;
        line-height: 15px;
        border-radius: 1px;
       font-weight: bold;
      }
    }
    .desc{
      position: relative;
      width: 70%;
      margin: auto;
      color: white;
      margin-bottom: 3px;
      .taking{
        display: inline-block;
        width: 100px;
      }
    }
    .wrap{
      position: relative;
      width: 70%;
      height: 160px;
      margin: auto;
      overflow-y: auto;
      border: 1px solid white;
      text-align: center;
    }
  }

</style>
<style>
  .el-radio-button--mini .el-radio-button__inner{
    min-width: 150px !important;
  }
</style>
