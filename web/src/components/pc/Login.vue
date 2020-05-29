<template>
  <div class="pc-login">
    <div class="login">
      <div class="item"><input type="text" placeholder="请输入账号"></div>
      <div class="item"><input type="password" placeholder="请输入密码"></div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
      data() {
        return {

        }

      },
      methods: {
        login(){
          this.$router.push("/pc/datafetching");
        }
      }
    }
</script>

<style lang="scss">
  .pc-login{
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 6px;
    .login{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 180px;
      height:85px;
      background-color: white;
      border-radius: 3px;
      padding: 10px;
      .item{
        width: 90%;
        margin: auto;
        margin-bottom: 10px;
        height: 20px;
        input{
          height: 100%;
          display: inline-block;
          width: 100%;
          border: none;
          border-bottom: 0.1px solid #919191;
        }
      }
      .login-btn{
        cursor: pointer;
        background-color: #fabe00;
        width: 90%;
        margin: auto;
        border-radius: 1px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-weight: bold;
        letter-spacing:2px
      }
    }
  }
</style>
