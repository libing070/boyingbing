<template>
   <div class="galaxy">
    <top-bar :isshowBackbtn="true" :backurl="backurl"></top-bar>
    <div class="galaxy-warp" id="galaxyWarp">
      <div class="title">
        <span class="line"></span>
        <div class="desc"> <img class="icon" :src="require('../../assets/img/'+iconName+'.png')">{{titleName}}</div>
      </div>
      <div class="item-type">
        <div class="box">
          <span class="name">品牌</span>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select v-model="brandName" @change="changeBrandList($event)">
              <option v-for="(item,index) in brandList" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="box">
          <span class="name">车型</span>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select v-model="carName" @change="changeCarTypeList($event)">
              <option v-for="(item,index) in carTypeList" v-bind:value="item.id">{{item.name}}</option>

            </select>
          </div>
        </div>
        <div class="zhedie big-box carYear" v-show="isShowNiankuan">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select v-bind:disabled="isDisabledNiankuan" v-model="niankuanName" @change="changeCarYearList($event)">
              <option value="">年款</option>
              <option v-for="(item,index) in carYearList" :disabled="item.is_true==1?false:true" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="zhedie item-time">
        <div class="box">
          <span class="radio-name">时间选择：</span>
          <span v-show="isShowTimeChoose" type="0" class="radio-option active"><img :src="require('../../assets/img/radio-checked.png')">自定义</span>
          <span v-show="isShowTimeChoose" type="1" class="radio-option"><img :src="require('../../assets/img/radio-nochecked.png')">上市期</span>
        </div>
        <div class="box" v-if="timeRadiooption==0">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select v-model="dateType" @change="changeDateType($event)">
              <option value="month">按月</option>
              <option value="day">按日</option>
            </select>
          </div>
          <div class="choose-time">
            <span class="text start-time-text" @click="chooseCalendarClick($event)">{{currentStartDateText}}</span>
            <span class="time-line"></span>
            <span class="text end-time-text" @click="chooseCalendarClick($event)">{{currentEndDateText}}</span>
          </div>
        </div>
        <div class="box" v-else-if="timeRadiooption==1" v-bind:class="[shangshiqiTimeBox]">
          <div class="desc" v-show="shangshiDesc">请注意：同一车系不同年款的上市期不同，请选择年款</div>
          <div class="choose-time" style="width: 100%">
            <span style="width: 46%" class="text start-time-text" @click="chooseCalendarClick($event)">{{ExposureStartDateText}}</span>
            <span class="time-line"></span>
            <span style="width: 46%" class="text end-time-text" @click="chooseCalendarClick($event)">{{ExposureEndDateText}}</span>
          </div>
        </div>
        <div class="box" v-else-if="timeRadiooption==-1">
          <div class="choose-time" style="width: 100%">
            <span style="width: 46%" class="text start-time-text" @click="chooseCalendarClick($event)">{{currentStartDateText}}</span>
            <span class="time-line"></span>
            <span style="width: 46%" class="text end-time-text" @click="chooseCalendarClick($event)">{{currentEndDateText}}</span>
          </div>
        </div>
      </div>
      <div class="zhedie item-area" v-bind:class="[isHideBorderbottom]">
        <div class="box">
          <span class="area-name">区域选择：</span>
        </div>
        <div class="box">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text" readonly class="select-sheet"v-bind:value="areaText"  @click="chooseAreaSheetClick"></input>
          </div>
          <div class="cc" style="margin: 0 15px">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text"readonly v-bind:disabled="provinceDisabled" class="select-sheet" v-bind:value="provinceText" @click="chooseProvinceSheetClick"></input>
          </div>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text"readonly v-bind:disabled="cityDisabled" class="select-sheet" v-bind:value="cityText" @click="chooseCitySheetClick"></input>
          </div>
        </div>
        <div class="list-area"  >
          <span v-for="(item, index) in resultDataList" class="list">
            <span class="text">{{item}}</span>
            <img @click="deleteCurrArea(item)"  class="icon" :src="require('../../assets/img/icon-close.png')">
          </span>
        </div>
      </div>
      <div class="zhedie item-user-form" v-bind:class="[isHideUserFrom1]">
        <div class="box">
          <span class="user-attribute">用户属性：</span>
        </div>
        <div class="box">
          <span class="checked-option user" v-bind:class="[activechecked.isActivechezhu,disabledchecked.isDisabledchezhu]"><img v-bind:src="activechecked.isActivechezhu=='active'?checked_url:nochecked_url"><span class="text">车主</span></span>
          <span class="checked-option user" v-bind:class="[activechecked.isActiveyonghu,disabledchecked.isDisabledyonghu]"><img v-bind:src="activechecked.isActiveyonghu=='active'?checked_url:nochecked_url"><span class="text">一般用户</span></span>
          <span class="checked-option user" v-bind:class="[activechecked.isActiveshuijun,disabledchecked.isDisabledshuijun]"><img v-bind:src="activechecked.isActiveshuijun=='active'?checked_url:nochecked_url"><span class="text">水军</span></span>
          <span class="checked-option user" v-bind:class="[activechecked.isActivemeiti,disabledchecked.isDisabledmeiti]"><img v-bind:src="activechecked.isActivemeiti=='active'?checked_url:nochecked_url"><span class="text">媒体</span></span>
        </div>
      </div>
      <div class="zhedie item-user-form" style="border: none" v-bind:class="[isHideUserFrom2]">
        <div class="box">
          <span class="user-attribute">来源媒体：</span>
        </div>
        <div class="box">
          <span class="checked-option media" v-bind:class="[activechecked.isActivezhijia,disabledchecked.isDisabledzhijia]"><img v-bind:src="activechecked.isActivezhijia=='active'?checked_url:nochecked_url"><span class="text">汽车之家</span></span>
          <span class="checked-option media" v-bind:class="[activechecked.isActiveyiche,disabledchecked.isDisabledyiche]"><img v-bind:src="activechecked.isActiveyiche=='active'?checked_url:nochecked_url"><span class="text">易车</span></span>
          <span class="checked-option media" v-bind:class="[activechecked.isActiveaika,disabledchecked.isDisabledaika]"><img v-bind:src="activechecked.isActiveaika=='active'?checked_url:nochecked_url"><span class="text">爱卡汽车</span></span>
          <span class="checked-option media" v-bind:class="[activechecked.isActivetaipinyang,disabledchecked.isDisabledtaipinyang]"><img v-bind:src="activechecked.isActivetaipinyang=='active'?checked_url:nochecked_url"><span class="text">太平洋汽车</span></span>

        </div>
      </div>
      <div class="zhedie start-wrap" @click="startAnalysisClick">
        开始分析
      </div>
      <div class="retractable-btn" @click="retractableClick">
        <img :src="retractable_url">
      </div>
    </div>
     <div class="echarts-wrap" v-if="isShowEchartsWrap">
       <span v-if="target=='buy'">
         <analysis-buy :chidlrenParams="chidlrenParams"></analysis-buy>
       </span>
       <span v-else-if="target=='sound'">
         <analysis-sound :chidlrenParams="chidlrenParams"></analysis-sound>
       </span>
       <span v-else-if="target=='koubei'">
         <analysis-koubei :chidlrenParams="chidlrenParams"></analysis-koubei>
       </span>
       <span v-else-if="target=='doubt'">
         <analysis-doubt :chidlrenParams="chidlrenParams"></analysis-doubt>
       </span>
       <span v-else-if="target=='pleased'">
         <analysis-pleased :chidlrenParams="chidlrenParams"></analysis-pleased>
       </span>
       <span v-else-if="target=='reason'">
         <analysis-reason :chidlrenParams="chidlrenParams"></analysis-reason>
       </span>

     </div>
     <span v-if="dateType=='month'">
       <my-calendar  v-show="mycalendarshow"
                     :min-date="myminDate"
                     :max-date="mymaxDate"
                     :current-startdate="currentStartDate"
                     :current-enddate="currentEndDate"
                     v-on:dateInterval="dateInterval"
                     :key="timer"
       ></my-calendar>
     </span>
     <span v-else>
       <van-calendar
         v-model="calendarshow"
         :min-date="minDate"
         :max-date="maxDate"
         type="range"
         @confirm="onConfirm" />
     </span>



     <van-action-sheet v-model="areaShow" :actions="areaActions" @select="onAreaSelect" />

     <span v-if="areaText=='省市'">
            <van-action-sheet ref="provinceActionsheet" id="provinceActionsheet" :close-on-click-overlay=false  cancel-text="确定" @cancel="onProvinceCancel" v-model="provinceShow" :actions="provinceActions" @select="onProvinceSelect" />
     </span>
     <span>
            <van-action-sheet  v-model="provinceShow" :actions="provinceActions" @select="onProvinceSelect" />
     </span>
       <van-action-sheet id="cityActionsheet" :close-on-click-overlay=false  cancel-text="确定" @cancel="onCityCancel"  v-model="cityShow" :actions="cityActions" @select="onCitySelect" />
   </div>

</template>

<script>
  import pData from '../../assets/json/province'
  import TopBar from "../common/TopBar";
  import MyCalendar from "./../common/MyCalendar";
  // 下面是导入两张图片的相对地址
  import retractable_close from '../../assets/img/retractable-button-close.png'
  import retractable_open from '../../assets/img/retractable-button.png'

  import AnalysisBuy from "./AnalysisBuy";
  import AnalysisDoubt from "./AnalysisDoubt";
  import AnalysisKoubei from "./AnalysisKoubei";
  import AnalysisPleased from "./AnalysisPleased";
  import AnalysisReason from "./AnalysisReason";
  import AnalysisSound from "./AnalysisSound";


  export default {
        name: "index",
    components: {
      TopBar,
      MyCalendar,
      AnalysisBuy,
      AnalysisDoubt,
      AnalysisKoubei,
      AnalysisPleased,
      AnalysisReason,
      AnalysisSound
    },
    data () {
        return {
          target:'',
          backurl:'/dimensions',
          isShowNiankuan:true,//年款是否显示
          niankuanName:'',
          isDisabledNiankuan:false,//年款是否禁用
          isShowTimeChoose:true,//是否显示时间选择
          timeRadiooption:'-1',//当前是0自定义，还是1上市期
          shangshiDesc:false,//只有满意&不满意，购买&拒绝显示
          shangshiqiTimeBox:'disabled',//当单选按钮是上市期时 默认时间禁止选择
          checked_url:require('../../assets/img/icon-checkbox-checked.png'),
          nochecked_url:require('../../assets/img/icon-checkbox-nochecked.png'),
          activechecked:{//是否选中
            isActivechezhu:'',//车主
            isActiveyonghu:'',//一般用户
            isActiveshuijun:'',//水军
            isActivemeiti:'',//媒体
            isActivezhijia:'',//汽车之家
            isActiveyiche:'',//易车
            isActiveaika:'',//爱卡汽车
            isActivetaipinyang:'',//太平洋汽车
          },
          disabledchecked:{//是否可选
            isDisabledchezhu:'',//车主
            isDisabledyonghu:'',//一般用户
            isDisabledshuijun:'',//水军
            isDisabledmeiti:'',//媒体
            isDisabledzhijia:'',//汽车之家
            isDisabledyiche:'',//易车
            isDisabledaika:'',//爱卡汽车
            isDisabledtaipinyang:'',//太平洋汽车
          },
          isHideUserFrom1:'',
          isHideUserFrom2:'',
          isHideBorderbottom:'',
          userattributeList:[],
          mediaList:[],
          titleName:'',
          iconName:'',
          brandList:[],
          brandName:'',
          carTypeList:[],
          carName:'',
          carYearList:[],
          timer: '',
          dateType:'month',//按月，按天
          currentEndDateText:'结束日期',
          currentStartDateText:'开始日期',
          ExposureStartDateText: '开始日期',
          ExposureEndDateText: '结束日期',
          mycalendarshow:false,
          myminDate: new Date(2018, 7, 1),
          mymaxDate: new Date(2020, 4, 31),
          currentStartDate: new Date(2018, 11, 3),//从月份0开始 表示12月
          currentEndDate: new Date(2020, 1, 3),//从月份0开始

          mydateInterval:[],

          calendarshow: false,
          minDate: new Date(new Date().getFullYear()-2, 0, 1),
          maxDate: new Date(),
          currStartDate: new Date(2020, 0, 3),//从月份0开始 表示1月
          currEndDate: new Date(2020, 4, 3),//从月份0开始

          areaText:'全国',
          provinceText:'省',
          cityText:'城市',
          provinceDisabled:true,
          cityDisabled:true,

          areaShow: false,
          areaActions:[],
          provinceShow:false,
          provinceActions:[],

          cityShow:false,
          cityActions:[],

          currPList:['全国'],//当前选中的省份
          currCList:[],//当前选中的城市
          currProvinceCity:[],//当前选中省下面的市集合
          resultDataList:['全国'],//最终展示的结果

          retractable_url:retractable_open,
          chidlrenParams:[],//图表需要的参数集合
          isShowEchartsWrap:false,
        }
    },
    created(){
        var that=this;
        this.target=  this.$route.query.target;
        var  name=  this.$route.query.name;
        var  iconName=  this.$route.query.icon;
        console.log(this.target+"  "+name+"  "+iconName);
        if(this.target=='buy'){
          this.areaActions=[
            { name: '全国' },
            { name: '省市' },
            { name: '城市' ,disabled:true},
          ]
        }else{
          this.areaActions=[
            { name: '全国' },
            { name: '省市' },
            { name: '城市'},
          ]
        }
        this.titleName=name;
        this.iconName=iconName;
        this.initParameters()//初始化默认参数

        var nowdate=new Date();
        //按月，设置默认起止日期（不包括当前月）
        var beforeMonth=nowdate.getFullYear()+"/"+(this.p(nowdate.getMonth()));
        var resbefore6Month=this.GetPreMonthDay(beforeMonth,6);
        this.currentStartDate=new Date(resbefore6Month.split("/")[0],resbefore6Month.split("/")[1],1);
        this.currentStartDateText=this.currentStartDate.getFullYear()+"/"+(this.p(this.currentStartDate.getMonth()+1));
        var resbefore1Month=this.GetPreMonthDay(beforeMonth,1);
        this.currentEndDate=new Date(resbefore1Month.split("/")[0],resbefore1Month.split("/")[1],1);
        this.currentEndDateText=this.currentEndDate.getFullYear()+"/"+(this.p(this.currentEndDate.getMonth()+1));
        //按月，设置最小日期和最大日期选择范围
        var mmin=nowdate.getFullYear()-2//两年前
        this.myminDate=new Date(mmin,1,1);//最小日期为两年之前的1月开始
        this.mymaxDate=new Date(nowdate.getFullYear(),nowdate.getMonth(),1);//最大值为当前月
        //按天
        this.currStartDate=new Date(nowdate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
        this.currEndDate=new Date(nowdate - 1000 * 60 * 60 * 24 * 1);//获取前一天

    },
    mounted(){
          var that=this;
         that.$nextTick(() => {
           console.log('mounted....');

           //自定义 上市期单选按钮切换事件
           $("body").off('click','.item-time .radio-option').on("click",'.item-time .radio-option',function () {
             $(this).addClass("active").siblings().removeClass("active");
             $(this).find('img').attr("src",require("../../assets/img/radio-checked.png"));
             $(this).siblings().find('img').attr("src",require("../../assets/img/radio-nochecked.png"));
             that.timeRadiooption=$(this).attr('type');
             switch(that.target) {
               case 'buy':
               break;
               case 'sound':
                 break;
               case 'koubei':
                 break;
               case 'pleased':
                 that.shangshiDesc=true;//描述显示
                 break;
               case 'reason':
                 that.shangshiDesc=true;//描述显示
                 break;
               case 'doubt':
                 break;
             }
             if(that.isShowNiankuan&&$(this).attr('type')==1){//选择的是满意不满意或者购买拒绝 且时间选择是上市期 则年款下拉框 2018年后不可选择
               if(that.carName=='大指挥官'){
                 that.isShowNiankuan=false;
               }else{
                 that.isShowNiankuan=true;
               }
                 that.getCarYearList(0);
             }else{
               if(!(that.target=='pleased'||that.target=='reason')){
                 that.isShowNiankuan=false;
               }else{
                 if(that.carName=='大指挥官'){
                   that.isShowNiankuan=false;
                 }else{
                   that.isShowNiankuan=true;
                 }
               }
               that.getCarYearList();
             }

           });



           $("body").off('click','.item-user-form .checked-option').on("click",'.item-user-form .checked-option',function () {
          if(!$(this).hasClass("disabled")){
            if($(this).hasClass("active")){
              $(this).removeClass("active");
              $(this).find('img').attr("src",that.nochecked_url);
              if($(this).hasClass("user")){
                that.userattributeList.remove( $(this).find('.text').html());
              }
              if($(this).hasClass("media")){
                that.mediaList.remove( $(this).find('.text').html());
              }

            }else{
              $(this).addClass("active");
              $(this).find('img').attr("src",that.checked_url);
              if($(this).hasClass("user")){
                that.userattributeList.push( $(this).find('.text').html());
              }
              if($(this).hasClass("media")){
                that.mediaList.push( $(this).find('.text').html());
              }
            }
          }
        })
      })

    },
    watch:{
      '$store.state.mycalendarshow': function () {
        this.mycalendarshow= this.$store.state.mycalendarshow;
      },
      'resultDataList':function () {
      },
      'brandName':function () {
        var that=this;
        if(that.target!='buy'&&that.brandName!='Jeep'){
           that.timeRadiooption=0;
          $("body").find('.item-time .radio-option').each(function () {
            if($(this).index()==1){
              $(this).addClass("active");
              $(this).find('img').attr("src",require("../../assets/img/radio-checked.png"));
            }else{
              $(this).removeClass("active");
              $(this).find('img').attr("src",require("../../assets/img/radio-nochecked.png"));
            }
          });
        }
      },
      'niankuanName':function () {
        var that=this;
        if((that.target=='pleased'||that.target=='reason')&&that.niankuanName==''){
          that.ExposureStartDateText='开始日期';
            that.ExposureEndDateText= '结束日期';
        }
      }
    },
    methods:{
       initParameters(){
         var that=this;
         this.getBrandList();
         switch(this.target) {
           case 'buy':
            that.isDisabledNiankuan=true;
            that.isShowTimeChoose=false;
             that.disabledchecked.isDisabledchezhu='disabled';
             that.disabledchecked.isDisabledyonghu='disabled';
             that.disabledchecked.isDisabledshuijun='disabled';
             that.disabledchecked.isDisabledmeiti='disabled';
             that.disabledchecked.isDisabledzhijia='disabled';
             that.disabledchecked.isDisabledyiche='disabled';
             that.disabledchecked.isDisabledaika='disabled';
             that.disabledchecked.isDisabledtaipinyang='disabled';
             that.timeRadiooption=-1;//上市期
             that.shangshiqiTimeBox='';//可选
             that.isHideBorderbottom='border-bottom';
             that.isHideUserFrom1='isHideUserFrom';
             that.isHideUserFrom2='isHideUserFrom';
             break;
           case 'sound':
             that.isDisabledNiankuan=true;

             that.activechecked.isActivechezhu='active';
             that.activechecked.isActiveyonghu='active';
             that.activechecked.isActiveshuijun='active';
             that.activechecked.isActivemeiti='active';
             that.activechecked.isActivezhijia='active';
             that.activechecked.isActiveyiche='active';
             that.activechecked.isActiveaika='active';
             that.activechecked.isActivetaipinyang='active';
             that.timeRadiooption=0;//自定义
             that.userattributeList=['车主','一般用户','水军','媒体'];
             that.mediaList=['汽车之家','易车','爱卡汽车','太平洋汽车'];
             break;
           case 'koubei':
             that.isDisabledNiankuan=true;

             that.activechecked.isActivechezhu='active';
             that.activechecked.isActiveyonghu='active';
             that.activechecked.isActiveshuijun='active';
             that.activechecked.isActivemeiti='active';
             that.activechecked.isActivezhijia='active';
             that.activechecked.isActiveyiche='active';
             that.activechecked.isActiveaika='active';
             that.activechecked.isActivetaipinyang='active';
             that.timeRadiooption=0;//自定义
             that.userattributeList=['车主','一般用户','水军','媒体'];
             that.mediaList=['汽车之家','易车','爱卡汽车','太平洋汽车'];
             break;
           case 'pleased':
             that.activechecked.isActivezhijia='active';
             that.activechecked.isActiveyiche='active';
             that.activechecked.isActiveaika='active';
             that.activechecked.isActivetaipinyang='active';

             that.disabledchecked.isDisabledchezhu='disabled';
             that.disabledchecked.isDisabledyonghu='disabled';
             that.disabledchecked.isDisabledshuijun='disabled';
             that.disabledchecked.isDisabledmeiti='disabled';

             that.timeRadiooption=0;//自定义
             that.mediaList=['汽车之家','易车','爱卡汽车','太平洋汽车'];
             that.isHideUserFrom1='isHideUserFrom';
             break;
           case 'reason':
             that.activechecked.isActivezhijia='active';
             that.activechecked.isActiveyiche='active';
             that.activechecked.isActiveaika='active';
             that.activechecked.isActivetaipinyang='active';


             that.disabledchecked.isDisabledchezhu='disabled';
             that.disabledchecked.isDisabledyonghu='disabled';
             that.disabledchecked.isDisabledshuijun='disabled';
             that.disabledchecked.isDisabledmeiti='disabled';

             that.timeRadiooption=0;//自定义

             that.mediaList=['汽车之家','易车','爱卡汽车','太平洋汽车'];
             that.isHideUserFrom1='isHideUserFrom';
             break;
           case 'doubt':
             that.isDisabledNiankuan=true;

             that.activechecked.isActivechezhu='active';
             that.activechecked.isActiveyonghu='active';
             that.activechecked.isActiveshuijun='active';
             that.activechecked.isActivezhijia='active';
             that.activechecked.isActiveyiche='active';
             that.activechecked.isActiveaika='active';
             that.activechecked.isActivetaipinyang='active';

             that.disabledchecked.isDisabledmeiti='disabled';
             that.timeRadiooption=0;//自定义

             that.userattributeList=['车主','一般用户','水军'];
             that.mediaList=['汽车之家','易车','爱卡汽车','太平洋汽车'];
             break;
         }

       },
       changeBrandList(event){
          this.getCarTypeByBrand();
       },
       changeCarTypeList(event){

         var that=this;
          for(var key in this.carTypeList) {
            var item = this.carTypeList[key];
            if (item.name == this.carName) {
              var date = item.date.split("~");
              this.ExposureStartDateText = date[0];
              this.ExposureEndDateText = date[1];
            }
          }
         var ty=$("body").find('.item-time .radio-option.active').attr("type");
         if(that.isShowNiankuan&&ty==1){//选择的是满意不满意或者购买拒绝 且时间选择是上市期 则年款下拉框 2018年后不可选择
           if(that.carName=='大指挥官'){
             that.isShowNiankuan=false;
           }else{
             that.isShowNiankuan=true;
           }
           that.getCarYearList(0);
         }else{
           if(!(that.target=='pleased'||that.target=='reason')){
             that.isShowNiankuan=false;
           }else{
             if(that.carName=='大指挥官'){
               that.isShowNiankuan=false;
             }else{
               that.isShowNiankuan=true;
             }
           }
           that.getCarYearList();

         }
       },
       changeCarYearList(event){
          for(var key in this.carYearList) {
            var item = this.carYearList[key];
            if(this.niankuanName!=''){
              if (item.name == this.niankuanName) {
                var date = item.date.split("~");
                this.ExposureStartDateText = date[0];
                this.ExposureEndDateText = date[1];
              }
            }else{
              this.ExposureStartDateText = '开始日期';
              this.ExposureEndDateText =  '结束日期';
            }

          }
       },
        getBrandList(){//获取品牌下拉列表数据
          this.$axios
            .get("/car/brand", {})
            .then(res => {
              if (res.data.status === 1) {
                for(var val of res.data.data){
                 this.brandList.push(val);
                }
                this.brandName=this.brandList[0].name;
                this.getCarTypeByBrand();
              } else {
                this.$toast(res.data.msg);
              }
            });
        },
        getCarTypeByBrand(){
         var that=this;
          this.isShowNiankuan=(this.target=='pleased'||this.target=='reason')&&this.brandName=="Jeep"?true:false;
          this.isShowTimeChoose=this.target!='buy'&&this.brandName=="Jeep"?true:false;
          this.carTypeList=[];
          this.$axios
            .get("/car/series?brand="+this.brandName)
            .then(res => {
              if (res.data.status === 1) {
                for(var val of res.data.data){
                  this.carTypeList.push(val);
                }
                this.carName=this.carTypeList[0].name
                var item = this.carTypeList[0];
                var date = item.date.split("~");
                this.ExposureStartDateText = date[0];
                this.ExposureEndDateText = date[1];

                var ty=$("body").find('.item-time .radio-option.active').attr("type");
                if(that.isShowNiankuan&&ty==1){//选择的是满意不满意或者购买拒绝 且时间选择是上市期 则年款下拉框 2018年后不可选择
                  if(that.carName=='大指挥官'){
                    that.isShowNiankuan=false;
                  }else{
                    that.isShowNiankuan=true;
                  }
                  that.getCarYearList(0);
                }else{
                  if(!(that.target=='pleased'||that.target=='reason')){
                    that.isShowNiankuan=false;
                  }else{
                    if(that.carName=='大指挥官'){
                      that.isShowNiankuan=false;
                    }else{
                      that.isShowNiankuan=true;
                    }
                  }
                  that.getCarYearList();
                }
              } else {
                this.$toast(res.data.msg);
              }
          });

        },
        getCarYearList(flag) {
          //刷新年款
          var that=this;
          this.carYearList=[];
          this.$axios
            .get("/car/year?brand="+this.brandName+"&series="+this.carName)
            .then(res => {
              if (res.data.status === 1) {
                for(var val of res.data.data){
                  if(flag==0&&Number(val.id.replace("款",""))<2018){
                    var key = "is_true";
                    var value = 0; //0不可选
                    val[key] = value;//添加是否可选
                  }else{
                    var key = "is_true";
                    var value = 1;//1可选
                    val[key] = value;//添加是否可选
                  }
                  that.carYearList.push(val);
                }
                var item = that.carYearList[0];
              //  this.niankuanName = item.name;

                if((that.target=='pleased'||that.target=='reason')&&that.niankuanName==''){
                  that.ExposureStartDateText='开始日期';
                  that.ExposureEndDateText= '结束日期';
                }else{
                  // var date = item.date.split("~");
                  // this.ExposureStartDateText = date[0];
                  // this.ExposureEndDateText = date[1];
                }

              } else {
                this.$toast(res.data.msg);
              }
          });
        },
        handleLoad () {
          this.timer = new Date().getTime()
        },
        chooseCalendarClick(e){
        var hasDisabled=e.target.parentElement.parentElement.classList;
        if(hasDisabled.contains("disabled")){//非交叉购买率 且时间选择是上市期 默认时间不能选择
          return;
        }
          var that=this;
          if(this.dateType=='month'){
            this.calendarshow=false;
            this.currentStartDate=new Date(this.currentStartDateText.split("/")[0],(Number(this.currentStartDateText.split("/")[1])-1),1);
            this.currentEndDate=new Date(this.currentEndDateText.split("/")[0],(Number(this.currentEndDateText.split("/")[1])-1),1);
            that.$store.commit('changeMyCalendar',true);
            that.mycalendarshow= that.$store.state.mycalendarshow;
            setTimeout(function () {
              $("body").find("#mycalendar").addClass("open");
              $("body").find("#mycalendar").find(".footer-btn").css("opacity","1");
            },100);
          }else{
            this.calendarshow=true;
          }

        },
        dateInterval: function (childValue) {
          // childValue就是子组件传过来的值
          this.mydateInterval = childValue
          this.currentStartDateText=this.mydateInterval[0];
          this.currentEndDateText=this.mydateInterval[1];
        },

        formatDate(date) {
          return `${date.getFullYear() + 1}/${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
          const [start, end] = date;
          this.calendarshow = false;
          this.currentStartDateText=`${this.formatDate(start)}`;
          this.currentEndDateText=`${this.formatDate(end)}`;
        },


        changeDateType(event){
          if(this.dateType=='month'){
            this.currentStartDateText=this.currentStartDate.getFullYear()+"/"+(this.p(this.currentStartDate.getMonth()+1));
            this.currentEndDateText=this.currentEndDate.getFullYear()+"/"+(this.p(this.currentEndDate.getMonth()+1));
          }else{
            this.currentStartDateText=this.currStartDate.getFullYear()+"/"+(this.p(this.currStartDate.getMonth()+1)+"/"+this.currStartDate.getDate());
            this.currentEndDateText=this.currEndDate.getFullYear()+"/"+(this.p(this.currEndDate.getMonth()+1)+"/"+this.currEndDate.getDate());
          }

        },
        chooseAreaSheetClick(){
          this.areaShow = true;
        },
        onAreaSelect(item) {
          // 默认情况下点击选项时不会自动收起
          // 可以通过 close-on-click-action 属性开启自动收起
          this.areaShow = false;
          this.areaText=item.name;
          this.provinceText='省';
          //this.cityText='';
          this.currPList=[];
          this.currCList=[];
          this.resultDataList=[];
          if(item.name=='全国'){
            this.provinceDisabled=true;//省市选择关闭
            this.cityDisabled=true;//城市选择关闭
            this.resultDataList.push("全国");
          }
         else{
            this.provinceDisabled=false;//省市选择开启
            this.cityDisabled=true;//城市选择关闭
          }
        },
        chooseProvinceSheetClick(event){
         var that=this;
          that.provinceActions=[];
          for(var i = 0; i < pData.length; i++){
            var obj = pData[i];
            var num = obj.regionName;
            var isExist = false;
            for(var j = 0; j < that.currPList.length; j++){
              var aj = that.currPList[j];
              var n = aj;
              if(n == num){
                isExist = true;
                break;
              }
            }
            if(isExist){
              that.provinceActions.push({name:pData[i].regionName,color:'#fabe00',className:'active'});
            }else{
             that.provinceActions.push({name:pData[i].regionName,color:'',className:''});
            }
          }
         var areaProv=[{name:'全选',color:'',className:''}];
          this.areaText=='省市'?that.provinceActions=areaProv.concat(that.provinceActions.concat({name:'',color:'',className:''})):'';//最后追加一个空值 否则确定按钮挡住最后一个省份
          this.provinceShow = true;
        },
        onProvinceSelect(item){
          var that=this;
         // this.cityText='';
          if(this.areaText=="省市"){
            if(item.name=='全选'){
              that.resultDataList=[];
              that.currPList=[];
              $("#provinceActionsheet").find("button").each(function () {
                if(($("#provinceActionsheet button").length!=($(this).index()+1))&&($(this).find('span').html()!='全选')){
                  $(this).css("color",'#fabe00');
                }
              });
              for(var i = 0; i < pData.length; i++){
                that.currPList.push(pData[i].regionName);
              };
              setTimeout(function () {
                that.resultDataList=[];
                that.resultDataList=that.currPList;
                that.provinceShow=false;
              },100);
            }else{
              item.color=item.color==''?'#fabe00':'';
              item.className=((item.className.indexOf('active')!=-1)?'':'active');
              if(item.className=='active'){
                this.currPList.push(item.name);
              }else{
                this.currPList.remove(item.name);
              }
              this.currPList=this.currPList.unique(this.currPList);
            }

          }
          else if(this.areaText=="城市"){
            this.provinceShow = false;//省市选择开启
            this.cityDisabled=false;//城市选择开启
            this.provinceText=item.name;
            that.currProvinceCity=[];
            pData.forEach((val)=>{
              if(val.regionName==item.name){
                that.currProvinceCity=val;
              }
            })
          }

        },
        chooseCitySheetClick(){
         var that=this;
          this.cityActions=[];
          if(that.currProvinceCity.children!=undefined){
            for(var i = 0; i < that.currProvinceCity.children.length; i++){
              var obj = that.currProvinceCity.children[i];
              var num = obj.regionName;
              var isExist = false;
              for(var j = 0; j < that.currCList.length; j++){
                var aj = that.currCList[j];
                var n = aj;
                if(n == num){
                  isExist = true;
                  break;
                }
              }
              if(isExist){
                that.cityActions.push({name:that.currProvinceCity.children[i].regionName,color:'#fabe00',className:'active'});
              }else{
                that.cityActions.push({name:that.currProvinceCity.children[i].regionName,color:'',className:''});
              }
            }
          }else{
            this.cityActions.push({name:that.currProvinceCity.regionName,color:'',className:''});//说明是直辖市
          }
          this.cityActions=this.cityActions.concat({name:'',color:''});
          this.cityShow = true;
        },
        onCitySelect(item){
          item.color=item.color==''?'#fabe00':'';
          item.className=((item.className.indexOf('active')!=-1)?'':'active');
          if(item.className=='active'){
            this.currCList.push(item.name);
          }else{
            this.currCList.remove(item.name);
          }
          this.currCList= this.currCList.unique(this.currCList);
        },
        onProvinceCancel(v){
           console.log(this.currPList);
          this.resultDataList=[];
           this.resultDataList=this.currPList;
        },
        onCityCancel(){
          console.log(this.currCList);
          this.resultDataList=[];
          this.resultDataList=this.currCList;
        },
        deleteCurrArea(item){
          this.resultDataList.remove(item);
        },
        retractableClick(){
         var that=this;
          var currClass=document.getElementById("galaxyWarp").className;
         // var zhedie=  document.getElementsByClassName("zhedie");
          var zhedie=$(".zhedie").not(".isHideUserFrom");
          if(currClass.indexOf("close")>-1){
            this.isShowEchartsWrap=false;
            document.getElementById("galaxyWarp").classList.add("open");
            document.getElementById("galaxyWarp").classList.remove("close");
            for(var i=0;i<zhedie.length;i++){
                zhedie[i].classList.remove("hidediv");
            }
            document.getElementsByClassName("item-type")[0].style.borderBottom="0.1px solid #d8d8d8";
            this.retractable_url=retractable_open;
            for(var i=0;i<zhedie.length;i++){
              zhedie[i].classList.remove("hidediv");
              (function(a) {
                setTimeout(function() {
                //  console.log(a);
                  zhedie[a].classList.add("showdiv");
                  if ($.inArray('carYear', zhedie[a].classList)!=-1) {
                    zhedie[a].style.display="inline";
                  }else{
                    zhedie[a].style.display="block";
                  }
                },100*a);
              })(i);
            }
          }else{
            this.isShowEchartsWrap=true;
            document.getElementById("galaxyWarp").classList.add("close");
            document.getElementById("galaxyWarp").classList.remove("open");
            document.getElementsByClassName("item-type")[0].style.borderBottom="none";
            this.retractable_url=retractable_close;
                for(var i=zhedie.length-1;i>=0;i--){
                  zhedie[i].classList.remove("showdiv");
                  zhedie[i].classList.add("hidediv");

                  (function(a) {
                    setTimeout(function() {
                      //console.log(a);
                      //zhedie[a].classList.add("hidediv");
                      zhedie[a].style.display="none";
                    }, 400/a);
                  })(i);

                }
          }
          setTimeout(function () {
            if(!that.isShowNiankuan)
            $("body").find(".big-box").css("display","none");
          },100);


        },
        p(s) {
          return s < 10 ? '0' + s : s
        },
        getPreMonth(date){
          var arr = date.split('-');
          var year = arr[0]; //获取当前日期的年份
          var month = arr[1]; //获取当前日期的月份
          var day = arr[2]; //获取当前日期的日
          var days = new Date(year, month, 0);
          days = days.getDate(); //获取当前日期中月的天数
          var year2 = year;
          var month2 = parseInt(month) - 1;
          if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
          }
          var day2 = day;
          var days2 = new Date(year2, month2, 0);
          days2 = days2.getDate();
          if (day2 > days2) {
            day2 = days2;
          }
          if (month2 < 10) {
            month2 = '0' + month2;
          }
          var t2 = year2 + '-' + month2 + '-' + day2;
          return t2;
        },
        GetPreMonthDay: function (date, monthNum) {//monthNum从0开始
          var dateArr = date.split('/');
          var year = dateArr[0]; //获取当前日期的年份
          var month = dateArr[1]; //获取当前日期的月份
          var day = dateArr[2]; //获取当前日期的日
          var days = new Date(year, month, 0);
          days = days.getDate(); //获取当前日期中月的天数
          var year2 = year;
          var month2 = parseInt(month) - monthNum;
          if (month2 <= 0) {
            year2 =parseInt(year2) -parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
            month2 = 12 - (Math.abs(month2) % 12);
          }
          var day2 = day;
          var days2 = new Date(year2, month2, 1);
          days2 = days2.getDate();
          if (day2 > days2) {
            day2 = days2;
          }
          if (month2 < 10) {
            month2 = '0' + month2;
          }
          var t2 = year2 + '/' + month2 + '/' + days2;
          return t2;
        },
        startAnalysisClick(){
          var that=this;
          var ty=$("body").find('.item-time .radio-option.active').attr("type");
          if((that.target=='pleased'||that.target=='reason')&&that.niankuanName==''&&ty==1){
            this.$toast("请选择年款");
            return;
          }
          that.retractableClick();
          that.isShowEchartsWrap=true;
          var data={
            yType:that.target,
            brand:that.brandName,
            series:that.carName,
            year:that.target=='pleased'||that.target=='reason'?that.niankuanName:'',
            date:that.timeRadiooption==1?[that.ExposureStartDateText,that.ExposureEndDateText]:[that.currentStartDateText.replace(/\//g,"-"),that.currentEndDateText.replace(/\//g,"-")],
            area:that.areaText=='全国'?'all':that.areaText=='省市'?"province":"city",//all,province,city
            province:that.areaText=='省市'?that.resultDataList:[],
            city:that.areaText=='城市'?that.resultDataList:[],
            user:that.userattributeList,
            media:that.mediaList,
            terminal:'app'
          }
          that.chidlrenParams=data;
         // console.log( that.chidlrenParams);
        },

      }
    }
</script>

<style lang="scss" scoped>
  input, select {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    color: #B5B5B5;
  }
  select{
       background-color:transparent;
       border: none;
       appearance: none;
       -moz-appearance: none;
       -webkit-appearance: none;
     }
  select::-ms-expand { display: none; }

    .galaxy {
      background: #fabe00;
      /*height: 100%;*/
      width: 100%;
      top: 0;
      left: 0;
      overflow: auto;
      position: relative;
      padding-bottom: 1rem;
      .galaxy-warp {
        position: relative;
        margin: auto;
        width: 95%;
        border-radius: 5px;
        background: white;
       // margin-bottom: 1rem;
        /*padding-bottom: 8rem;*/
        margin-top: -6rem;
        height:100%;
        transition: all 0.6s ease-out;
        .title {
          width: 100%;
          position: relative;
          top: 1rem;
          font-size: 36px;
          .line {
            position: absolute;
            background: #fabe00;
            left: 0;
            width: 5px;
            height: 2rem;
            top: 0;
            bottom: 0;
          }

          .desc {
            .icon{
              display: inline-block;
              height: 1.5rem;
              padding-left: 5px;
              padding-right: 25px;
              vertical-align: bottom;
            }
            display: flex;
            align-items: center;
            height: 70px;
            font-weight: bold;
            border-bottom: 0.7px solid #fabe00;
            width: 90%;
            margin: auto;
            margin-left: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-bottom: 0.8rem;
          }
        }
        .item-type {
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            display: inline-block;
            width: 48%;
            height: 100%;
            font-size: 28px;
            .name {
              display: inline-block;
              line-height: 140px;
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 78%;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                background: #fff;
                pointer-events: none;
              }
              select {
                font-size: 28px;
                padding-left: 30px;
                width: 100%;
                height: 100%;
                display: inline-block;
              }
            }
          }
          .box:nth-child(1) {
            float: left;
          }
          .box:nth-child(2) {
            float: right;
          }
          .big-box {
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 100%;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              select {
                padding-left: 10px;
                font-size: 28px;
                width: 100%;
                height: 100%;
                display: inline-block;
              }
            }
          }
        }
        .item-time {
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            margin-bottom: 20px;
            radio-name {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .radio-option {
              display: inline-block;
              height: 35px;
              padding:0 50px;
              img {
                vertical-align: middle;
                padding-right: 15px;
                height: 100%;
              }
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 150px;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              select {
                padding-left: 10px;
                width: 100%;
                height: 100%;
                display: inline-block;
                font-size: 28px;
              }
            }
            .choose-time {
              width: 450px;
              height: 65px;
              float: right;
              display: block;
              .text {
                text-align: center;
                display: inline-block;
                width: 200px;
                height: 100%;
                line-height: 65px;
                background-color: #f9f9f9;
                color: #B5B5B5;
              }
              .time-line {
                background-color: #fabe00;
                height: 3px;
                width: 25px;
                vertical-align: middle;
                display: inline-block;
              }
            }
          }
          .box.disabled{
            opacity: 0.5;
          }
        }
        .item-area{
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            area-name {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 180px;
              height: 65px;
              display: inline-block;

              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              .select-sheet {
                font-size: 28px;
                padding-left: 10px;
                width: 100%;
                height: 100%;
                line-height: 2;
                display: inline-block;
                border: none;
                background-color: #f9f9f9;
              }
            }
          }
          .list-area{
            width: 100%;
            display: inline-block;
            font-size: 28px;
            max-height: 200px;
            overflow-y: auto;
            .list{
              display: inline-block;
              margin: 10px;
              padding: 5px;
              height: 60px;
              min-width: 150px;
              background-color: #fabe00;
              color: #000;
              text-align: center;
              line-height: 60px;
              border-radius: 10px;
              font-size: 28px;
              .icon{
                height: 30%;
                padding-left: 10px;
                vertical-align: middle;
              }
            }
          }
        }
        .border-bottom{
          border-bottom: none !important;
        };
        .item-user-form{
          width: 90%;
          top: 1rem;
          position: relative;
          margin: auto;
          margin-top: 5px;
          padding-bottom: 20px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            .user-attribute {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .checked-option {
              display: inline-block;
              height: 35px;
              padding: 8px 20px 8px 5px;

              img {
                vertical-align: middle;
                padding-right: 15px;
                height: 110%;
              }
              .text {
                display: inline-block;
              }
            }
            .checked-option.disabled{
              opacity: 0.5;
            }
          }
        }
        .isHideUserFrom{
          display: none;
        }
        .start-wrap{
          width: 550px;
          height: 105px;
          line-height: 105px;
          text-align: center;
          color: #000;
          background-color: #fabe00;
          margin: auto;
          margin-top: 50px;
          font-weight: bold;
          font-size: 40px;
          margin-bottom: 20px;
        }
        .retractable-btn{
          width: 40px;
          height: 25px;
          margin: auto;
        //  margin-top: 40px;
          padding-top: 1rem;
          padding-bottom: 2rem;
          position: relative;
          z-index: 0;
          img{
            width: 100%;
          }
        }
      }
      .galaxy-warp.close{
        height: 10rem;
      }
      .galaxy-warp.open{
        height: auto;
      }
      .hidediv{
        animation-name:fadeoutnum;
        animation-timing-function: ease-in-out;
        animation-iteration-count:1;
        animation-fill-mode:forwards;
        -webkit-animation-name: fadeoutnum;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-duration: 0.01s;
        -webkit-animation-direction: alternate;
      }
      @-webkit-keyframes fadeoutnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:1}
        100% { opacity:0;}
      }
      @-moz-keyframes fadeoutnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:1}
        100% { opacity:0;}
      }
      @-o-keyframes fadeoutnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:1}
        100% { opacity:0;}
      }
      @keyframes fadeoutnum{
        0% {opacity:1}
        100% { opacity:0;}
      }
      .showdiv{
        animation-name:fadeinnum;
        animation-timing-function: ease-in-out;
        animation-iteration-count:1;
        animation-fill-mode:forwards;
        -webkit-animation-name: fadeinnum;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-duration: 0.01s;
        -webkit-animation-direction: alternate;
      }
      @-webkit-keyframes fadeinnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:0}
        100% { opacity:1;}
      }
      @-moz-keyframes fadeinnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:0}
        100% { opacity:1;}
      }
      @-o-keyframes fadeinnum{ /*设置内容由显示变为隐藏*/
        0% {opacity:0}
        100% { opacity:1;}
      }
      @keyframes fadeinnum{
        0% {opacity:0}
        100% { opacity:1;}
      }
      .echarts-wrap{
        margin-top: 1rem;
      }
  }

</style>
<style>
  .van-picker{
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
  }
  .van-picker__cancel, .van-picker__confirm{
    color: #fabe00;
  }
  .van-action-sheet__cancel{
     position: fixed;
     bottom: 0;
    background-color: #fabe00;
    color: #000;
  }
  .van-calendar__day--end, .van-calendar__day--multiple-middle, .van-calendar__day--multiple-selected, .van-calendar__day--start, .van-calendar__day--start-end{
    background-color: #fabe00;
    color: #000;
    font-weight: bold;
  }
  .van-calendar__day--middle{
    color: #000;
    background-color: rgba(250,190,0,0.1);
  }
  .van-calendar__day--middle::after{
    background-color: rgba(250,190,0,0.1);
  }
  .van-button--danger{
    background-color: #fabe00;
    border: none;
    color: #000;
  }
</style>
