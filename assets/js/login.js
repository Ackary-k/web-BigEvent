// 登录注册模块切换
$('#to-register').on('click', function () {
    $('.login-box').hide().siblings('.reg-box').show();
})

$('#to-login').on('click', function () {
    $('.reg-box').hide().siblings('.login-box').show();
})

// 登录注册用户名和密码验证
let form = layui.form;
form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6~12位, 不能出现空格!'],
    repwd: function (value) {
        let pwd = $('.reg-box [type=password]').val();
        if (value !== pwd) {
            return '两次密码不一致!';
        }
    }
})
 
/**
 * 表单提交处理  http://api-breakingnews-web.itheima.net
 * 注册: /api/reguser
 * 登录: /api/login
*/

// 监听注册提交
$('#reg-form').on('submit', function (e) {
    e.preventDefault();
    
    let data = {
        username: $('#reg-user-inp').val(),
        password: $('#reg-pwd-inp').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            } 
            layer.msg('注册成功，请登录！')
            $('#to-login').click();
        }
    })
    console.log(data);
})

// 监听登录提交
$('#login-form').on('submit', function (e) {
    e.preventDefault();

    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败!');
            }
            layer.msg('登录成功!')
            localStorage.setItem('token', res.token);
            location.href = '/index.html'
        }
    })
})