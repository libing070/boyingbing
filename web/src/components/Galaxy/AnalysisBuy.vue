<template>
  <div class="analysisbuy">
    <div class="item">
      <div class="draw small" id="echartbuy1" :style="{ height: '300px'}"></div>
      <img @click="zoomInClick(1,$event)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="item">
      <div class="draw small" id="echartbuy2" :style="{ height: '600px'}"></div>
      <img @click="zoomInClick(2,$event)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="rotate-div" v-if="isShowZoomIn">
      <zoom-in :downloadName="downloadName" v-on:isShowZoomOut="isShowZoomOutMethods"></zoom-in>
    </div>

  </div>
</template>

<script>
  import ZoomIn from "./../common/ZoomIn";
  export default {
    props:['chidlrenParams'],
    components: {
        ZoomIn
     },
        name: "analysis-buy",//交叉购买考虑
      data () {
        return {
          isShowZoomIn:false,
          drawData1:[],
          drawData2:[],
          downloadName:'',
        }
      },
      created(){
      },
    watch:{
      'chidlrenParams': function () {
        console.log(this.chidlrenParams);
      },
    },
    mounted(){
      var that=this;
      this.loadData1();
      this.loadData2();
    },
    methods: {
      loadData1(){
        var that=this;
        this.$axios
          .post("/cross/media", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              console.log(res.data.data.series);
              that.drawData1=res.data.data.series;
              that.drawLine1('echartbuy1');
            } else {
              this.$toast(res.data.msg);
            }
          });
      },
      drawLine1($el){
        var that=this;
        let seriesData=[];
        for(let index in that.drawData1){
          var currArr=that.drawData1[index];
          var vals=[],name='';
          for(let val in currArr){
            vals.push([currArr[0],currArr[1],currArr[2]]);
            name=currArr[3];
          }
          seriesData.push({
            name: name,
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8,
                label : {
                  show: true,
                  position: 'top',
                  fontSize:'10',
                  formatter:function (params) {
                    return params.seriesName
                  }
                }
              }
            },
            symbolSize: function (val) {
              return val[2]>10000?val[2]/6000:val[2]/200;
            },
            data:vals
          });
        }

        // 基于准备好的dom，初始化echarts实例
        let echartbuy1 = that.$echarts.init(document.getElementById($el))
        echartbuy1.setOption({
          grid: {
            left: '15%', //grid 组件离容器左侧的距离。默认值是10%。
            bottom:'25%',
          },
          title: {
            text: '交叉购买考虑-垂媒留资数据',
            left:'10',
            top:'10',
            textStyle:{
              fontSize:'14'
            },
            subtext:'反向线索重合度',
          },
          animation: true,
          // toolbox: {
          //   right:'15%',
          //   top:'10',
          //   feature: {
          //     saveAsImage: {
          //       type:'jpeg',
          //       pixelRatio: 2,
          //       title:'交叉购买考虑-垂媒留资数据',
          //    //   icon:'data:image/png;base64,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'
          //     }
          //   }
          // },
          tooltip: {
            trigger:'item',
         //  formatter:'{a}<br />{c}'
            formatter:function (params) {
              console.log(params);

              return "车型:"+params.seriesName+'<br/>正向线索:'+params.value[0]+'%<br/>反向线索:'+params.value[1]+'%<br/>线索量:'+params.value[2]
            }

          },
          xAxis: {
             name:'正向线索重合度',
            nameLocation :'center',
            nameTextStyle:{
               padding:9,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLabel: {
              formatter: function(value,index){
                return value+'%'
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true
            },
            axisLabel: {
              formatter: function(value,index){
                return value+'%'
              }
            }

          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              // start: 0,
              // end: 35
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              // start: 0,
              // end: 35
            }
          ],
          series:seriesData
        });
      },
      loadData2(){
        var that=this;
       // that.$loading.show();
        this.$axios
          .post("/praise/compet", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              that.drawData2=res.data.data;
              that.drawLine2('echartbuy2');
            } else {
              this.$toast(res.data.msg);
            }
          //  that.$loading.hide();
          });
      },
      drawLine2($el){
        var that=this;
        var yAxisData=[],seriesData=[];
          yAxisData=that.drawData2.x;
          seriesData=that.drawData2.series;
        // 基于准备好的dom，初始化echarts实例
        let echartbuy2 = this.$echarts.init(document.getElementById($el));
        // 绘制图表
        echartbuy2.setOption({
          grid: {
            left: '30%', //grid 组件离容器左侧的距离。默认值是10%。
          },
          title: {
            text: '交叉购买考虑-用户提及数据',
            left:'10',
            top:'10',
            textStyle:{
              fontSize:'14'
            },
            subtext:'提及量',
            // subtextStyle:{
            //   align:'right'
            // },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: 'value',
            // axisLabel: {
            //   interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
            //   rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
            // }
          },
          yAxis: {
            type: 'category',
            data: yAxisData,
            axisLabel: {
              fontSize: '10',
              // interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              // rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
            }
          },
          series: [{
            data: seriesData,
            type: 'bar',
            name:'提及量',
            itemStyle: {
              normal: {
                color: '#fabe00',
                label : {
                  show: true,
                  position: 'right',
                }
              }
            },
          }]
        });
      },
      zoomInClick(num,$event){
        var that=this;
        that.isShowZoomIn=true;
        that.$nextTick(() => {
          $($event.target).siblings(".draw.small").fadeOut();
          if(num==1){
            that.drawLine1('zoomIds');
            that.downloadName='交叉购买考虑-垂媒留资数据';
          }else if(num==2){
            that.drawLine2('zoomIds');
            that.downloadName='交叉购买考虑-用户提及数据';
          }
        });

      },
      isShowZoomOutMethods: function (val) {
        // childValue就是子组件传过来的值
        this.isShowZoomIn = val
      }
    }
    }
</script>

<style lang="scss" scoped>
   .analysisbuy{
     position: relative;
     width: 95%;
     margin: auto;
     .item{
       position: relative;
       background-color: white;
       width: 100%;
       border-radius: 5px;
       margin-bottom: 1rem;
       .draw{
         width: 100%;
       }
       .zoom-btn{
         position: absolute;
         right: 30px;
         top: 30px;
         width: 60px;
         animation: iconBottom 1.5s linear infinite;
       }
       @keyframes iconBottom {
         0% {
           opacity: 1;
         }
         50% {
           opacity: 0;
         }
         100% {
           opacity: 1;
         }
       }
     }
    .rotate-div{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      background-color: #fabe00;
    }
   }
</style>
