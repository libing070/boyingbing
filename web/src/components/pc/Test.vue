<template>
  <div class="pc-test"></div>
</template>

<script>
  import API from '../../api/api_article';
    export default {
        name: "test",
      created(){
        this.findListById();
        this.findAll();
      },
      methods:{
        findAll(){
          let that = this;
          that.loading = true;
          API.allList().then(function (result) {
            $("body .pc-index").append('<div>'+`${　JSON.stringify(result)}`+'</div>');
            that.loading = false;
            if(result){
              that.res=result;
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        },
        findListById(){
          let that = this;
          that.loading = true;
          API.findListById({id:27}).then(function (result) {
            that.loading = false;
            if(result){
              that.res=result;
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        },
      }

    }
</script>

<style lang="scss">
   .pc-index{
     font-size: 5px;
   }
</style>
