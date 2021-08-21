
// 每次请求 Ajax 之前调用 ajax 的配置项 自动配置 URL
$.ajaxPrefilter(function (option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;

    // 设置公共的 token 只有路径包含 /my/ 的使用
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token'),
        }
    }
})