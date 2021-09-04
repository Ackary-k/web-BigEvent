
// ajaxPrefilter 发起 ajax 请求之后, 真正发起请求之前调用
$.ajaxPrefilter(function (option) {
    
    // option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    option.url = 'http://127.0.0.1:8081' + option.url;

    // 设置公共的 token 只有路径包含 /my/ 的使用
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token'),
        }
    }

    // complete 函数配置
    option.complete = function (res) {
        if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '../../login.html';
        }
    }
})