export const toolsBase={
  getBrowserInfo:function (){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
      && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
      && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
      && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return "IE7  "+"["+userAgent+"]";
      } else if (fIEVersion == 8) {
        return "IE8  "+"["+userAgent+"]";
      } else if (fIEVersion == 9) {
        return "IE9  "+"["+userAgent+"]";
      } else if (fIEVersion == 10) {
        return "IE10  "+"["+userAgent+"]";
      } else if (fIEVersion == 11) {
        return "IE11  "+"["+userAgent+"]";
      } else {
        return "0  "+"["+userAgent+"]";
      }//IE版本过低
      return "IE  "+"["+userAgent+"]";
    }
    if (isOpera) {
      return "Opera  "+"["+userAgent+"]";
    }
    if (isEdge) {
      return "Edge  "+"["+userAgent+"]";
    }
    if (isFF) {
      return "Firefox  "+"["+userAgent+"]";
    }
    if (isSafari) {
      return "Safari  "+"["+userAgent+"]";
    }
    if (isChrome) {
      return "Chrome  "+"["+userAgent+"]";
    }
  },
  //获取系统版本号
  getSystemVersion:function (){
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
      var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
      if (isWin2K) return "Win2000";
      var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
      if (isWinXP) return "WinXP";
      var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
      if (isWin2003) return "Win2003";
      var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
      if (isWinVista) return "WinVista";
      var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
      if (isWin7) return "Win7";
      var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
      if (isWin10) return "Win10";
    }
    return "other";
  },
  //获取分辨率
  getResolution:function (){
    return window.screen.width+" * "+window.screen.height
  }
}
