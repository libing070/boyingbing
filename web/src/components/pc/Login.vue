<template>
  <div class="pc-login">
    <div class="login">
      <div class="item" style=" margin-bottom: 10px;"><input type="text" v-model="username" placeholder="请输入账号"></div>
      <div class="item"><input type="password" v-model="password" placeholder="请输入密码"></div>
      <div class="rem-pwd"><el-checkbox v-model="checkedbox" >记住密码</el-checkbox></div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
  import CryptoJS from "crypto-js";
  import API from '../../api/api_users';
    export default {
        name: "login",
      data() {
        return {
          username:'',
          password:'',
          checkedbox:false

        }

      },
      created(){
        var usernamecookie= document.cookie.indexOf("username=");
        if(usernamecookie==-1){
          localStorage.setItem("remenberPwd",'false');
          return;
        }
        if(localStorage.getItem("remenberPwd")=='true'){
          this.checkedbox=true;
          this.getCookie();
        }else{
          this.checkedbox=false;
          this.clearCookie();
        }
      },
      methods: {
        login(){
          let that = this;
          localStorage.removeItem("hasLogin");
          // var text = CryptoJS.AES.encrypt(that.password, 'secret key 123').toString();//使用CryptoJS方法加密
          // console.log(text);
          // var bytes = CryptoJS.AES.decrypt(text, 'secret key 123');//使用CryptoJS方法解密
          // var originalText=bytes.toString(CryptoJS.enc.Utf8);
          // console.log(originalText);
          if(that.username.trim()==""){
            this.$toast("请输入账号");
            return
          }
          if(that.password.trim()==""){
            this.$toast("请输入密码");
            return
          }
          var params={
            userName:that.username,
            password:that.$md5(that.password)
          };
          API.login(params).then(function (result) {
            if(result.code==200){
              if(that.checkedbox){
                //传入账号，密码，保存天数
                that.setCookie(that.username, that.password, 7);//cookie 有效期设置7天
                localStorage.setItem("remenberPwd",that.checkedbox);
              } else {
                //清空Cookie
                that.clearCookie();
                localStorage.setItem("remenberPwd",'false');
              }

              localStorage.setItem("hasLogin",true);
              that.$router.push("/admin/datafetching");
            }
            that.$toast(result.msg);
          }, function (err) {
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
             that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });



        },
        //设置cookie方法
        setCookie(username, password, days) {
          var text = CryptoJS.AES.encrypt(password, 'secret key 123');//使用CryptoJS方法加密
          var saveDays = new Date(); //获取时间
          // saveDays.setTime(saveDays.getTime() + 60 * 1000);// 1分钟测试
          saveDays.setTime(saveDays.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
          //字符串拼接存入cookie
          window.document.cookie = "username" + "=" + username + ";path=/;expires=" + saveDays.toGMTString();
          window.document.cookie = "password" + "=" + text + ";path=/;expires=" + saveDays.toGMTString();
        },
        //读取cookie
        getCookie() {
          if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
              var arr2 = arr[i].split('='); //再次切割
              //这里会切割出以mobile为第0项的数组、以password为第0项的数组，判断查找相对应的值
              if (arr2[0] == 'username') {
                this.username = arr2[1]; //拿到账号
              } else if (arr2[0] == 'password') {
                //拿到拿到加密后的密码arr2[1]并解密
                var bytes = CryptoJS.AES.decrypt(arr2[1].toString(), 'secret key 123');
                var plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
                this.password = plaintext;
              }
            }
          }
        },
        //清除cookie
        clearCookie() {
          this.setCookie("", "", 0); //账号密码置空，天数置0
        },
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
      height:100px;
      background-color: white;
      border-radius: 3px;
      padding: 10px;
      .item{
        width: 90%;
        margin: auto;
        height: 20px;
        input{
          height: 100%;
          display: inline-block;
          width: 100%;
          border: none;
          border-bottom: 0.1px solid #919191;
        }
      }
      .rem-pwd{
        width: 90%;
        margin: 5px auto;
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
<style>
  .el-checkbox__inner:hover,
  .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #fabe00;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #fabe00;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #fabe00;
    border-color: #fabe00;
  }
</style>
