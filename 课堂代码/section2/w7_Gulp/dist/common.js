"use strict";

jQuery(function ($) {
  $.ajaxSetup({
    // url: "http://120.76.247.5:2003/api",
    // 发送ajax请求之前
    beforeSend: function beforeSend(xhr) {
      // console.log('beforeSend=',xhr,this)
      // 设置baseUrl
      this.url = 'http://120.76.247.5:2003/api' + this.url;
    }
  });
});