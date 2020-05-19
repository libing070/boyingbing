<template>
  <div class="topbar">
    <div class="top">
    <div class="log">
      <img
      src="data:image/png;base64,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"
    >
    </div>
    <div class="lang-box">
      <span :class="['item',{lang:true, active:curLang === 'en'}]" data-type="en" @click="toggleLang">EN</span>
      <span :class="['item',{lang:true, active:curLang === 'zh'}]" data-type="zh" @click="toggleLang">中文</span>
    </div>
    <div class="esc-btn">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAmCAYAAAC76qlaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWNkZWZkYi1iOGY4LTZlNDEtYmZjYS00OGViOTNjNGRlNjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkM4QjAyODk3RDVDMTFFQTg1NDlFQkZFRUM5NkQyQTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkM4QjAyODg3RDVDMTFFQTg1NDlFQkZFRUM5NkQyQTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTE0ZmRkNS1jNTZiLWNiNGItOWM0Yi01ODdmZTBmYWJiOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkNGViZjI2YS05YzY3LTMxNGUtOTE5Yy1lMGM5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" @click.prevent="logout">
    </div>
  </div>
   <div class="block-bg" :style="{height:blockHeight}"></div>
    <div class="demand" v-show="isShowdemand" @click="showPopup">
      {{this.$t('global.new_demand')}}
    </div>

    <div id="popup_wrap" class="popup-wrap" v-show="newdemandShow">
      <div class=""></div>
      <div class="popup-wrap-content">
        <div class="content-top">
          <div class="title">
            {{this.$t('global.new_demand')}}
          </div>
          <textarea :placeholder="this.$t('global.placeholder1')" v-model="textareaContent"></textarea>
        </div>
        <div class="popup-wrap-btn">
          <div @click="hidePopup" class="btn cancel-btn">  {{this.$t('global.btn1')}}</div>
          <div @click="sendBtnClick" class="btn send-btn">  {{this.$t('global.btn2')}}</div>
        </div>
    </div>

    </div>

    <div class="back-btn" v-show="isshowBackbtn" @click="goBack()">
      <img :src="require('../../assets/img/icon-back.png')">
    </div>

  </div>
</template>

<script>
    export default {
        name: "top-bar",
      data() {
        return {
          newdemandShow: false,
          textareaContent:'',
          isShowdemand:false,
          blockHeight:'10rem',
        }
      },
      props: ['isshowBackbtn',"backurl"],
      computed: {
        curLang() {
          return this.$i18n.locale;
        },
      },
      created(){
          var that=this;
          console.log(this.$route.path);
        if(localStorage.isSuperAdmin=='true'){
          that.isShowdemand=true;
        }else{
          that.$route.path.indexOf('dimensions')>-1?that.blockHeight='7rem':that.blockHeight='10rem';
        }
      },
      methods:{
        goBack(){
            this.$router.push({path:this.backurl});

        },
        showPopup() {
          // if(localStorage.isSuperAdmin=='true'){
          //   this.newdemandShow = true;
          // }else{
          //   this.$toast("暂无权限");
          // }
          this.newdemandShow = true;
        },
        hidePopup(){
          this.newdemandShow = false;
          this.textareaContent="";
        },
        sendBtnClick(){
          var that=this;
          if(that.textareaContent.trim()==""){
            this.$toast(that.$t("global.message1"));
          }else{
            this.$axios
              .post("/mail?type='新需求'&text="+that.textareaContent)
              .then(res => {
                if (res.data.status === 1) {
                  this.$toast(that.$t("global.message2"));
                  this.newdemandShow = false;
                  this.textareaContent="";
                } else {
                  this.$toast(that.$t("global.message3"));

                  this.newdemandShow = false;
                  this.textareaContent="";
                }
              });
          }

    },
        toggleLang(e) {
          if(e.target.dataset.type=="en"){
            this.$toast("开发中，尽请期待...");
            return;
          }
          this.$i18n.locale = e.target.dataset.type;
          localStorage.lang = e.target.dataset.type;
        },
        logout() {
          var that=this;
          this.$dialog.alert({
            title: '提示',
            showCancelButton:true,
            confirmButtonColor:'#fabe00',
            message: '确认退出？'
          }).then(() => {
            localStorage.setItem("hasLogin", false);
            //this.$store.commit(types.CHANGE_GLOBAL_STATE, false);
            that.$router.push("sign-in");
          }).catch(() => {
            // on cancel
          });


        }
      }
    }
</script>

<style lang="scss" scoped>
  .topbar{
    .top{
      z-index: 0;
      position: relative;
      width: 100%;
      height: 91px;
      background-color: #000;
      border-bottom: 0.5px solid #fabe00;
      .log{
        position: absolute;
        left: 1rem;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 1.5rem;
        img{
          height: 1.5rem;
        }
      }
      .lang-box{
        position:absolute;
        right: 3rem;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 4rem;
        color: #fff;
        height: 1rem;
        font-size:24px;
        .item{
          display:inline-block;
          line-height: 1rem;
        }
        .item:nth-child(1){
          border-right:1px solid  #fabe00;
          padding-right: 0.3rem;
        }
        .item.active{
           color: #fabe00;
        }
      }
      .esc-btn{
        position:absolute;
        right: 1.5rem;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 38px;
        img{
          height: 100%;
        }
      }
    }
    .block-bg{
      background: #000;
      width: 100%;
    }
    .demand{
      position: absolute;
      right: 55px;
      top: 130px;
      height: 55px;
      text-align: center;
      border-radius: 2px;
      width: 130px;
      line-height: 55px;
      color: #000;
      font-weight: bold;
      background:#fabe00;
      font-size: 28px;

    }

    .popup-wrap{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      margin: auto;
      z-index: 2;
      background-color: rgba(0,0,0,.7);
      .popup-wrap-content{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 700px;
        height: 440px;
        .content-top{
          width: 100%;
          height: 400px;
          background-color: white;
          border-radius: 5px;
          .title{
            color: #000;
            font-size: 36px;
            font-weight: bold;
            width: 90%;
            height: 80px;
            line-height: 80px;
            margin: auto;
          }
          textarea{
            height: 280px;
            width: 85%;
           display: block;
            margin: auto;
            padding: 10px;
            padding-left: 30px;
            font-size: 28px;
          }

        }
        .popup-wrap-btn{
          width: 300px;
          height: 55px;
          margin: auto;
          margin-top: 40px;
          .btn{
            color: #000;
            font-weight: bold;
            background:#fabe00;
            font-size: 28px;
            width: 130px;
            height: 55px;
            line-height: 60px;
            text-align: center;
            border-radius: 2px;
          }
          .cancel-btn{
            float: left;
          }
          .send-btn{
            float: right;
          }
        }
      }

    }
    .back-btn{
      position: absolute;
      left: 55px;
      top: 145px;
      height: 40px;
      img{
        height: 100%;
      }
    }
  }

</style>
