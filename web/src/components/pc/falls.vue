<template>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
</template>
<script>
  //https://github.com/lfyfly/vue-waterfall-easy
  import API from '../../api/api_photos';
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import axios from 'axios'
  export default {
    components: {
      vueWaterfallEasy
    },
    data() {
      return {
        imgsArr:[],
        pageNo: 1,// request param
      };
    },
    computed: {},
    created() {
      this.getData()
    },
    mounted() {

    },
    methods: {
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
