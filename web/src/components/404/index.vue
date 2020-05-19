<template>
  <div>
    <div class="wrap">
      <div style="margin-top:-20px;">
        <h1 class="animated swing">404</h1>
        <h4>We're sorry, but the page you were looking for doesn't exist.</h4>
        <van-button  icon="wap-home"  @click="$router.go(-1)" color="#000">Come Back</van-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  h1 {
    text-align: center;
    font-size: 5rem;
    font-family: fantasy;
    // color: #475669;
    letter-spacing: 1rem;
    margin: 0;
  }
  h4 {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
}
</style>
