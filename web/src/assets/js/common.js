//数组中删除指定元素
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
//数组去重之相同的元素只保留一个
Array.prototype.unique = function(arr) {
  var hash=[];
  for (var i = 0; i < arr.length; i++) {
    if(hash.indexOf(arr[i])==-1){
      hash.push(arr[i]);
    }
  }
  return hash;
}

// //获取焦点后回退
$("input").focus(function () {
  distance = $(document).scrollTop();
});
$("textarea").focus(function () {
  distance = $(document).scrollTop();
});
$("select").focus(function () {
  distance = $(document).scrollTop();
});

//失去焦点后回退
$("input").blur(function () {
  $(document).scrollTop(distance);
});
$("textarea").blur(function () {
  $(document).scrollTop(distance);
});
$("select").blur(function () {
  $(document).scrollTop(distance);
});


/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
// function getPreMonth(date) {
//   var arr = date.split('-');
//   var year = arr[0]; //获取当前日期的年份
//   var month = arr[1]; //获取当前日期的月份
//   var day = arr[2]; //获取当前日期的日
//   var days = new Date(year, month, 0);
//   days = days.getDate(); //获取当前日期中月的天数
//   var year2 = year;
//   var month2 = parseInt(month) - 1;
//   if (month2 == 0) {
//     year2 = parseInt(year2) - 1;
//     month2 = 12;
//   }
//   var day2 = day;
//   var days2 = new Date(year2, month2, 0);
//   days2 = days2.getDate();
//   if (day2 > days2) {
//     day2 = days2;
//   }
//   if (month2 < 10) {
//     month2 = '0' + month2;
//   }
//   var t2 = year2 + '-' + month2 + '-' + day2;
//   return t2;
// }

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
// function getNextMonth(date) {
//   var arr = date.split('-');
//   var year = arr[0]; //获取当前日期的年份
//   var month = arr[1]; //获取当前日期的月份
//   var day = arr[2]; //获取当前日期的日
//   var days = new Date(year, month, 0);
//   days = days.getDate(); //获取当前日期中的月的天数
//   var year2 = year;
//   var month2 = parseInt(month) + 1;
//   if (month2 == 13) {
//     year2 = parseInt(year2) + 1;
//     month2 = 1;
//   }
//   var day2 = day;
//   var days2 = new Date(year2, month2, 0);
//   days2 = days2.getDate();
//   if (day2 > days2) {
//     day2 = days2;
//   }
//   if (month2 < 10) {
//     month2 = '0' + month2;
//   }
//
//   var t2 = year2 + '-' + month2 + '-' + day2;
//   return t2;
// }

//测试
//alert(getPreMonth("2014-01-25"));
//alert(getNextMonth("2014-12-25"));

