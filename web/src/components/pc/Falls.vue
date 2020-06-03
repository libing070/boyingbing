<template>
    <!--<div class="demo-1" id="demo-1">-->
      <!--<div v-for="item in list" class="item">-->
        <!--<img :src="item" style="width: 100%">-->
      <!--</div>-->
    <!--&lt;!&ndash; more items &ndash;&gt;-->
    <!--</div>-->
  <div class="infinite-list-wrapper demo-1" style="overflow:auto">
    <div v-for="item in list" class="item"
         v-infinite-scroll="load"
         infinite-scroll-disabled="disabled">
    <img :src="item" style="width: 100%">
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>

</template>

<script>
    export default {
        name: "falls",
      data () {
        return {
          count: 10,
          loading: false,
          list:[
            'https://images.unsplash.com/photo-1587701315112-724b3408e556?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
            'https://images.unsplash.com/photo-1590997661741-aab75c40b78b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591036258077-333d88e12fd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591037184604-1adf5d3c27ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1588783948922-d2f155b13c89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591056173689-550fb35ddb63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591056173689-550fb35ddb63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591062863963-d5236abfb814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591036642171-54f3fefeddb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591036723467-4b9f9913de56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            'https://images.unsplash.com/photo-1591036723467-4b9f9913de56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
          ]

        };
      },
      computed: {
        noMore () {
          return this.list.length >= 20
        },
        disabled () {
          return this.loading || this.noMore
        }
      },
      created(){

           this.fall($(".demo-1").find(".item img"));

      },
      mounted() {
      },
      methods:{
        load () {
   console.log(1);
       //   this.loading = true;
          setTimeout(() => {
            var html='';
            for(var i=0;i<this.list.length;i++){
              html+='<div class="item"><img style="width: 100%"  src="'+this.list[i]+'"></div>'
            }
            var str='<div></div>'
         //   $(".demo-1").append(html);
           // this.loading = false
          }, 2000)
        },
        fall(element) {
          const minGap = 20; // 最小间距，让每一列的最小空隙可以自定义，避免太过拥挤的情况发生。但是，会通过计算得到真实的间距。
          const itemWidth = 300; // 每一项的宽度，即当前每一个图片容器的宽度。保证每一列都是等宽不等高的。
          const scrollBarWidth = getScrollbarWidth();    // 获取滚动条的宽度
          const pageWidth = window.innerWidth - scrollBarWidth; // 获取当前页面的宽度 = window.innerWidth - 滚动条的宽度
          const column = Math.floor(pageWidth / (itemWidth + minGap)); // 实际列数=页面宽度/(图片宽度+最小间距)
          const gap = (pageWidth - itemWidth * column) / column/2; // 计算真实间距 = (页面宽度- 图片宽度*实际列数)/实际列数/2
         // const items = document.querySelectorAll('img'); // 获取所有的外层元素
          const items =element; // 获取所有的外层元素
          const heightArr = []; // 定义一个空数组，保存最低高度。

          // 获取滚动条的宽度
          function getScrollbarWidth() {
            const oDiv = document.createElement('div');//创建一个div
            // 给div设置样式。随便定义宽高，只要能获取到滚动条就可以
            oDiv.style.cssText = `width: 50px;height: 50px;overflowY: scroll;`
            document.body.appendChild(oDiv);//把div添加到body中
            const scrollbarWidth = oDiv.offsetWidth - oDiv.clientWidth;// 使最大宽度和可视宽度相减，获得到滚动条宽度。
            oDiv.remove();//移除创建的div
            return scrollbarWidth;//返回滚动条宽度
          }

          for (let i = 0; i < items.length; i++) {
            // 遍历所有的外层容器
            const height = items[i].offsetHeight;
            // 如果当前处在第一行
            if (i < column) {
              // 直接设置元素距离上部的位置和距离左边的距离。
              items[i].style.cssText = `top: ${gap}px;left: ${(itemWidth + gap) * i + gap}px`;
              // 保存当前元素的高度。
              heightArr.push(height);
            } else {
              // 不是第一行的话，就进行比对。
              let minHeight = heightArr[0]; // 先保存第一项的高度
              let minIndex = 0; // 保存第一项的索引值
              for (let j = 0; j < heightArr.length; j++) {
                // 通过循环遍历比对，拿到最小值和最小值的索引。
                if (minHeight > heightArr[j]) {
                  minHeight = heightArr[j];
                  minIndex = j;
                }
              }
              // 通过最小值为当前元素设置top值，通过索引为当前元素设置left值。
              items[i].style.cssText = `top: ${minHeight + gap *2}px; left: ${(itemWidth + gap) * minIndex + gap}px`;
              // 并修改当前索引的高度为当前元素的高度
              heightArr[minIndex] = minHeight + gap + height;
            }
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .demo-1{
    font-size: 5px;
    -moz-column-count:4; /* Firefox */
    -webkit-column-count:4; /* Safari 和 Chrome */
    column-count:4;
    -moz-column-gap: 5px;
    -webkit-column-gap: 5px;
    column-gap: 5px;
    width: 80%;
    margin:0 auto;
  }
  .item {
    padding: 5px;
    margin-bottom: 5px;
    -webkit-column-break-inside: avoid;
    break-inside: avoid; /*防止断点*/
    background: white;
    text-align: center;
  }
</style>
