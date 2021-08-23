

initUserInfo();

let form = layui.form;

form.verify({
    nickname: function (value) {
        console.log(value);
        if (value > 6) {
            return '昵称长度必须在 1~6 个字符之间!';
        }
    }
});

$('#btn-reset').on('click', function (e) {

    e.preventDefault();
    initUserInfo();

});

$('.layui-form').on('submit', function (e) {
    
    e.preventDefault();
    updateUserInfo();

});

function initUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        success: function (res) {

            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            // 调用 layui 中 form.val 方法快速填充表单数据
            form.val('formUserInfo', res.data);
            
        },
    });

}

function updateUserInfo() {
    
    $.ajax({
        url: '/my/userinfo',
        type: 'POST',
        data: $('.layui-form').serialize(),
        success: function (res) {

            console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('修改用户信息成功!');
            window.parent.getUserInfo();
            
        },
    });

}