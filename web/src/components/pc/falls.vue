<template>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
</template>
<script>
  //https://github.com/lfyfly/vue-waterfall-easy
  import api_accesslog from '../../api/api_accesslog';
  import API from '../../api/api_photos';
  import {toolsBase} from '../../assets/js/tools';
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import axios from 'axios'
  export default {
    components: {
      vueWaterfallEasy
    },
    data() {
      return {
        accesslogData:{},
        imgsArr:[],
        pageNo: 1,// request param
      };
    },
    computed: {},
    created() {
      this.loading();
      this.getData();
    },
    mounted() {

    },
    methods: {
      async loading(){
        let that = this;
        var ipinfo=await this.getIP();
        that.accesslogData=ipinfo;
        var res= await this.accesslog();
      },
      getIP(){
        let that = this;
        return new Promise(resolve => {
          that.$axios
            .get("http://ip-api.com/json/")
            .then(res => {
             if(res.status=200){
               resolve(res.data);
             }
            });
        });
      },
      accesslog(){
        return new Promise(resolve => {
          let that = this;
          that.accesslogData.ip=  that.accesslogData.query;
          that.accesslogData.systemVersion=toolsBase.getSystemVersion();
          that.accesslogData.browserVersion=toolsBase.getBrowserInfo();
          that.accesslogData.resolution=toolsBase.getResolution();
          api_accesslog.create(that.accesslogData).then(function (result) {
            if(result.code==200){
            }
          }, function (err) {
          }).catch(function (error) {
          });
        });


      },
      getData() {
        let that = this;
        API.getPhotosPageList({pageNo:that.pageNo}).then(function (result) {
          var li=[];
          console.log(result.data);
          if(result.code==200){
            for(var it of result.data){
              li.push({
                "src": it.urlThumb,
                "href": it.urlSmall,
                "info":it.description
              })
            }
            that.imgsArr = that.imgsArr.concat(li);
            that.pageNo++
          }
        }, function (err) {
        }).catch(function (error) {
        });

        // axios.get('./static/mock/data.json?group=' + this.group)
        //   .then(res => {
        //     this.imgsArr = this.imgsArr.concat(res.data)
        //     this.group++
        //   })
      },
    },
  };
</script>
<style  scoped>

</style>
