<template>
  <div class="analysissound">
    <div class="item">
      <div class="draw small" id="echartsound1" :style="{ height: '350px'}"></div>
      <img @click="zoomInClick(1,$event)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="item">
      <div class="draw small" id="echartsound2" :style="{ height: '350px'}"></div>
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
      name: "analysis-sound",//产品垂媒声量
      props:['chidlrenParams'],
      components: {
        ZoomIn
      },
      data () {
        return {
          isShowZoomIn:false,
          drawData1:[],
          drawData2:[],
          downloadName:'',
        }
      },
      created(){},
      watch:{
        'chidlrenParams': function () {
         // console.log(this.chidlrenParams);
        },
      },
      mounted(){
        this.loadData1();
        this.loadData2();
      },
      methods: {
        loadData1(){
          var that=this;
          this.$axios
            .post("/sound/day", that.chidlrenParams)
            .then(res => {
              if (res.data.status ==1) {
                that.drawData1=res.data.data;
                that.drawLine1('echartsound1');
              } else {
                this.$toast(res.data.msg);
              }
            });
        },
        drawLine1($el){
          var that=this;
          let seriesData=[],xAxisData=[],legendData=[];
          var colorList=['#fabe00','#4D4D4D','#393939','#C94F06','#38586D','#2AADB4'];
          xAxisData=that.drawData1.x;
          for(let index in that.drawData1.series){
            legendData.push(that.drawData1.series[index].name);
            seriesData.push(
              {
                name: that.drawData1.series[index].name,
                type: 'line',
                data: that.drawData1.series[index].data,
                itemStyle: {
                  normal: {
                    color: colorList[index],
                  }
                },
              },
            );
          }

          // 基于准备好的dom，初始化echarts实例
          let echartsound1 = that.$echarts.init(document.getElementById($el))
          echartsound1.setOption({
            title: {
              text: '本竞品垂媒声量趋势',
              left:'10',
              top:'10',
              textStyle:{
                fontSize:'14'
              },
              // subtext:'声量',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
            //  data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
              data:legendData,
              bottom:0,
              textStyle:{
                fontSize:'10'
              },
            },
            grid: {
              left: '15%', //grid 组件离容器左侧的距离。默认值是10%。
              bottom:'20%',
              top:'20%'
            },
            // toolbox: {
            //   feature: {
            //     saveAsImage: {}
            //   }
            // },
            xAxis: {

              type: 'category',
              boundaryGap: false,
              //data: ['周一', '周二', '周三', '周四', '周五', '周六']
              data:xAxisData,
              // axisLabel: {
              //   interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              //   rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
              // }
            },
            yAxis: {
              name: '声量(万)',
              type: 'value',
              //  max:120000000,
              // splitNumber : 5,
              axisLabel: {
                // interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
                // rotate:38,  //调整数值改变倾斜的幅度（范围-90到90）
                formatter: function(value,index){
                  var value;
                  if (value >=10000) {
                    value = Number(value/10000);
                  }else if(value <10000){
                    value = value;
                  }
                  return value
                }
              }
            },
            series: seriesData
          });
        },
        loadData2(){
          var that=this;
         // that.$loading.show();
          this.$axios
            .post("/sound/all", that.chidlrenParams)
            .then(res => {
              if (res.data.status ==1) {
                that.drawData2=res.data.data;
                console.log(res.data.data);
                that.drawLine2('echartsound2');
              } else {
                this.$toast(res.data.msg);
              }
            //  that.$loading.hide();
            });
        },
        drawLine2($el){
          var that=this;
          var seriesBarData=[],seriesLineData=[],xAxisData=[];
          xAxisData=that.drawData2.x;
          seriesBarData=that.drawData2.series[0].data;
          seriesLineData=that.drawData2.series[1].data;
          // 基于准备好的dom，初始化echarts实例
          let echartsound2 = this.$echarts.init(document.getElementById($el));
          // 绘制图表
          echartsound2.setOption({
            grid: {
              left: '15%', //grid 组件离容器左侧的距离。默认值是10%。
              bottom:'18%',
              right: '15%',
              top:'25%'
            },
            title: {
              text: '本竞品产品销量对比',
              left:'10',
              top:'10',
              textStyle:{
                fontSize:'14'
              },
              // subtext:'声量',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              // feature: {
              //   dataView: {show: true, readOnly: false},
              //   magicType: {show: true, type: ['line', 'bar']},
              //   restore: {show: true},
              //   saveAsImage: {show: true}
              // }
            },
            legend: {
              data: ['声量', '销量'],
              top:40
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                  type: 'shadow'
                },
                axisLabel: {
                  interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
                  rotate:-38,   //调整数值改变倾斜的幅度（范围-90到90）
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '声量(万)',
                axisLabel: {
                  formatter: function(value,index){
                    var value;
                    if (value >=10000) {
                      value = Number(value/10000);
                    }else if(value <10000){
                      value = value;
                    }
                    return value
                  }
                },
                //  min: 0,
                // max: function (value) {
                //   return value.max ;
                // },
               //interval:'auto',
                // axisLabel: {
                //   formatter: '{value} ml'
                // }
              },
              {
                type: 'value',
                name: '销量',
                // max: function (value) {
                //   return value.max ;
                // },
                // min: 0,
                // max: 25,
                // interval: 5,
                // axisLabel: {
                //   formatter: '{value} °C'
                // }
                axisLabel: {
                  // interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
                  // rotate:-38,   //调整数值改变倾斜的幅度（范围-90到90）
                  // formatter: function(value,index){
                  //   var value;
                  //   if (value >=10000) {
                  //     value = Number(value/10000);
                  //   }else if(value <10000){
                  //     value = value;
                  //   }
                  //   return value
                  // }
                }
              }
            ],
            series: [
              {
                name: '声量',
                type: 'bar',
                yAxisIndex: 0,
                data:seriesBarData,
                barMaxWidth: 30, // 最大宽度
                markLine : {
                  lineStyle:{
                    color:'#3F3F3F',
                  },
                  label:{
                    position:'middle',
                    formatter: '{b}: {c}',
                  },
                  data : [
                    {type : 'average', name: '声量平均值'}
                  ]
                },
                itemStyle: {
                  normal: {
                    color: '#fabe00',
                  }
                },
              },
              {
                name: '销量',
                type: 'line',
                yAxisIndex: 1,
                data: seriesLineData,
                markLine : {
                  label:{
                    position:'middle',
                    formatter: '{b}: {c}',
                  },
                  data : [
                    {type : 'average', name: '销量平均值'}
                  ]
                },
                itemStyle: {
                  normal: {
                    color:'#3F3F3F',
                  }
                },
              }
            ]
          });
        },
        zoomInClick(num,$event){
          var that=this;
          that.isShowZoomIn=true;
          that.$nextTick(() => {
           $($event.target).siblings(".draw.small").fadeOut();
            if(num==1){
              that.drawLine1('zoomIds');
              that.downloadName='本竞品垂媒声量趋势';
            }else if(num==2){
              that.drawLine2('zoomIds');
              that.downloadName='本竞品产品销量对比';
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
  .analysissound{
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
