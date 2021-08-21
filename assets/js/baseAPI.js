
// 每次请求 Ajax 之前调用 
$.ajaxPrefilter(function (option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    
})