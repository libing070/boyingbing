<template>
  <div class="dimension-wrap">
    <top-bar :isshowBackbtn="false"></top-bar>
    <div class="dimension-item first">
      <div class="title">
        <span class="line"></span>
        <div class="desc">{{this.$t('dimension.depart1')}}</div>
      </div>
      <div class="item" @click="toAnalysisPage(['buy','icon-menus1-1'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-1.png')">
        <span class="desc">{{this.$t('dimension.list112')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" @click="toAnalysisPage(['sound','icon-menus1-2'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-2.png')">
        <span class="desc">{{this.$t('dimension.list27')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" @click="toAnalysisPage(['koubei','icon-menus1-3'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-3.png')">
        <span class="desc">{{this.$t('dimension.list15')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" @click="toAnalysisPage(['pleased','icon-menus1-4'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-4.png')">
        <span class="desc">{{this.$t('dimension.list14')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" @click="toAnalysisPage(['reason','icon-menus1-5'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-5.png')">
        <span class="desc">{{this.$t('dimension.list12')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" @click="toAnalysisPage(['doubt','icon-menus1-6'])">
        <img class="icon" :src="require('../../assets/img/icon-menus1-6.png')">
        <span class="desc">{{this.$t('dimension.list28')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" style="border-bottom: none">
        <img class="icon" style="height: 37%" :src="require('../../assets/img/icon-maintenance.png')">
        <span class="desc" style="color: #a1a1a1">{{this.$t('dimension.list18')}}</span>
      </div>
    </div>
    <div class="dimension-item" style="color: #a1a1a1">
      <div class="title">
        <span class="line"></span>
        <div class="desc">{{this.$t('dimension.depart2')}}</div>
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/icon-menus2-1.png')">
        <span class="desc">{{this.$t('dimension.list21')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/icon-menus2-2.png')">
        <span class="desc">{{this.$t('dimension.list22')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/icon-menus2-3.png')">
        <span class="desc">{{this.$t('dimension.list23')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/icon-menus2-4.png')">
        <span class="desc">{{this.$t('dimension.list24')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item" style="border-bottom: none">
        <img class="icon" style="height: 37%" :src="require('../../assets/img/icon-maintenance.png')">
        <span class="desc">{{this.$t('dimension.list18')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "../common/TopBar";
  export default {
        name: "index",
       components: {
         TopBar,
      },
    methods:{
      toAnalysisPage(key){
        var that=this;
        var name='';
        switch(key[0]) {
          case 'buy':
            name=that.$t("dimension.list112");
            break;
          case 'sound':
            name=that.$t("dimension.list27");
            break;
          case 'koubei':
            name=that.$t("dimension.list15");
            break;
          case 'pleased':
            name=that.$t("dimension.list14");
            break;
          case 'reason':
            name=that.$t("dimension.list12");
            break;
          case 'doubt':
            name=that.$t("dimension.list28");
            break;
        }
        this.$router.push({path: '/galaxy', query: {'target': key[0],'name':name,'icon':key[1]}})
      }
    }
    }
</script>

<style lang="scss" scoped>
  .dimension-wrap{
    background: #fabe00;
    padding-bottom: 1rem;
    .dimension-item{
      position: relative;
      margin: auto;
      width: 95%;
      border-radius: 5px;
      background: white;
      padding-bottom: 1rem;
      .title{
        width: 100%;
        position: relative;
        top: 1rem;
        font-size: 36px;
        .line{
          position: absolute;
          background: #fabe00;
          left: 0;
          width: 5px;
          height: 2rem;
          top: 0;
          bottom: 0;
        }
        .desc{
          height: 70px;
          font-weight: bold;
          border-bottom: 0.5px solid #fabe00;
          padding-left: 0.5rem;
          width: 90%;
          margin: auto;

          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .item{
        width: 90%;
        margin: auto;
        height: 100px;
        line-height: 100px;
        border-bottom: 0.5px solid #d8d8d8;
        position: relative;
        top: 1rem;
        .icon{
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 45%;
        }
        .desc{
          position: absolute;
          left: 2.5rem;
          font-weight: bold;
          font-size: 28px;
          width: 550px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;

        }
        .arrow-right{
          display: inline-block;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 30%;
        }
      }
    }
    .dimension-item.first{
      margin-bottom: 1rem;
      margin-top: -6rem;
    }
  }
</style>
