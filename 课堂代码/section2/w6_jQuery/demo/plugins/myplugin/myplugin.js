// 全局插件：扩展全局方法
;(function($){
    $.put = function(url,data,callback){
        return $.ajax({
            type:'put',
            url,
            data,
            success:callback
        })
    }
    $.delete = function(url,data,callback){
        return $.ajax({
            type:'delete',
            url,
            data,
            success:callback
        })
    }
})(jQuery);

// jquery对象插件：扩展原型对象
;(function($){
    $.fn.color=function(color){
        return this.each(function(index,el){

        })
    }
})(jQuery);

// $('div').color('#f00')