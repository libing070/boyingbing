<template>
  <div class="analysiskoubei">
    <div class="item">
      <div class="draw small" id="echartkoubei1" :style="{ height: '300px'}"></div>
      <img @click="zoomInClick(1,$event)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="item">
      <div class="draw small" id="echartkoubei2" :style="{ height: '300px'}"></div>
      <img @click="zoomInClick(2,$event)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="item">
      <div class="draw small" id="echartkoubei3" :style="{ height: '600px'}"></div>
      <img @click="zoomInClick(3,$event)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="rotate-div" v-if="isShowZoomIn">
      <zoom-in :downloadName="downloadName" v-on:isShowZoomOut="isShowZoomOutMethods"></zoom-in>
    </div>

  </div>
</template>

<script>
  import ZoomIn from "./../common/ZoomIn";
    export default {
      name: "analysis-koubei",//产品口碑
      props:['chidlrenParams'],
      components: {
        ZoomIn
      },
      data () {
        return {
          isShowZoomIn:false,
          drawData1:[],
          drawData3:[],
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
        this.loadData3();
      },
      methods: {
        loadData1(){
          var that=this;
          this.$axios
            .post("/praise/day", that.chidlrenParams)
            .then(res => {
              if (res.data.status ==1) {
                that.drawData1=res.data.data;
                that.drawLine1('echartkoubei1');
                that.drawLine2('echartkoubei2');
              } else {
                this.$toast(res.data.msg);
              }
            });
        },
        drawLine1($el){
          var that=this;
          let seriesData=[],xAxisData=[],legendData=[];
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
                    color: index==0?'#fabe00':'#3F3F3F',
                  }
                },
              },
            );
          }
          // 基于准备好的dom，初始化echarts实例
          let echartkoubei1 = that.$echarts.init(document.getElementById($el))
          echartkoubei1.setOption({
            title: {
              text: '口碑变化趋势',
              left:'10',
              top:'10',
              textStyle:{
                fontSize:'14'
              },
               subtext:'提及量',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              bottom:20, //居左显示
              //  data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
              data:legendData,
              textStyle:{
                fontSize:'10'
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              containLabel: true
            },
            // toolbox: {
            //   feature: {
            //     saveAsImage: {}
            //   }
            // },
            xAxis: {
              type: 'category',
              //data: ['周一', '周二', '周三', '周四', '周五', '周六']
              data:xAxisData,
              axisLabel: {
                // interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
                // rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                // interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
                // rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
              }
            },
            series: seriesData
          });
        },
        loadData3(){
          var that=this;
          //that.$loading.show();
          this.$axios
            .post("/praise/emotion", that.chidlrenParams)
            .then(res => {
              if (res.data.status ==1) {
                that.drawData3=res.data.data;
                that.drawLine3('echartkoubei3');
              } else {
                this.$toast(res.data.msg);
              }
            //  that.$loading.hide();
            });
        },
        drawLine2($el){
          var that=this;
          var plus=0;//正
           for(var i=0;i<that.drawData1.series[0].data.length;i++){
             plus+=that.drawData1.series[0].data[i];
           }
           var minus=0;//负
          for(var j=0;j<that.drawData1.series[1].data.length;j++){
            minus+=that.drawData1.series[1].data[j];
          }
          // 基于准备好的dom，初始化echarts实例
          let echartkoubei2 = this.$echarts.init(document.getElementById($el));
          // 绘制图表
          echartkoubei2.setOption({
            title: {
              text: '口碑正负分布',
              left:'10',
              top:'10',
              textStyle:{
                fontSize:'14'
              },
              // left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              bottom: '0',
              data: ['正', '负']
            },
            series: [
              {
                 name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: plus, name: '正'},
                  {value: minus, name: '负'},
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  },
                  normal:{
                    color:function(params) {
                      //自定义颜色
                      var colorList = [
                        '#fabe00','#3F3F3F',
                      ];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }
            ]
          });
        },
        drawLine3($el){
          var that=this;
          var yAxisData=[],pulsSeriesData=[],minusSeriesData=[];
          yAxisData= that.drawData3.x;
          pulsSeriesData=that.drawData3.series[0].data;
          minusSeriesData=that.drawData3.series[1].data;

          // 基于准备好的dom，初始化echarts实例
          let echartkoubei3 = this.$echarts.init(document.getElementById($el));
          // 绘制图表
          echartkoubei3.setOption({
            title: {
              text: '口碑详情',
              left:'10',
              top:'10',
              textStyle:{
                fontSize:'14'
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['正', '负'],
              bottom:0
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '6%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: yAxisData,
              axisLabel: {
                fontSize: '10',
              }
            },
            series: [
              {
                name: '正',
                type: 'bar',
                stack: '总量',
                label: {
                  show: false,
                  position: 'insideRight'
                },
                data:pulsSeriesData,
                itemStyle: {
                  normal: {
                    color: '#fabe00',
                  }
                },
              },
              {
                name: '负',
                type: 'bar',
                stack: '总量',
                label: {
                  show: false,
                  position: 'insideRight'
                },
                data: minusSeriesData,
                itemStyle: {
                  normal: {
                    color: '#3F3F3F',
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
            }else if(num==3){
              that.drawLine3('zoomIds');
              that.downloadName='口碑详情';
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
  .analysiskoubei{
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
