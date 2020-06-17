<template>
  <div class="index-box">
    <nav class="top-nav">
         <img class="logo" src="../../assets/logo.png" height="70%">
         <div class="author">
           <span class="name">波英冰</span>
           <span class="desc">Photos for everyone</span>
         </div>
      <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="searchInput" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="sign">
        <el-button @click="uploadPhotos">上传图片</el-button>
        <el-button @click="login">登录</el-button>
        <el-button type="warning" @click="join">注册</el-button>
      </div>
    </nav>
    <div class="falls">
      <falls></falls>
    </div>

  </div>
</template>

<script>
  import falls from '../pc/Falls'
    export default {
        name: "Index",
      components: {
        falls
      },
      data(){
          return {
            searchInput:''
          }
      },
      created(){

      },
      mounted(){

      },
      methods:{
        uploadPhotos(){
          this.$toast("暂未开放");
        },
        login(){

          this.$router.push({path:  "/"+this.$store.state.terminaType+'/login'})
        },
        join(){
          this.$toast("暂未开放");
        }
      }
    }
</script>

<style lang="scss" scoped>
.index-box{
  position: relative;
  font-size: 0.24rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .top-nav{
    background-color: white;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 0.7rem;
    width: 98%;
    display: flex;
    align-items: center;
    .logo{
      align-items: center;
    }
    .author{
      display: flex;
      flex-direction: column;
      white-space: nowrap;
      margin-left: 0.2rem;
      .name{
        font-size: 0.18rem;
        font-weight: 700;
      }
      .desc{
        font-size: 0.13rem;
      }
    }
    .search{
      margin-left: 0.2rem;
      min-width: 13rem;
    }
    .sign{
      margin-left: 0.4rem;
    }
  }
  .falls{
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
  .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: #fabe00;
  }
  .el-button--warning:hover,
  .el-button--warning{
    background-color: #fabe00;
    border-color: #fabe00;
  }
</style>

