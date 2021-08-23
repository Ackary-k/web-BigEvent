// 自定义校验规则
let form = layui.form;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
        if ($('[name="oldPwd"]').val() === value) {
            return '新密码不能与旧密码相同!'
        }
    },
    rePwd: function (value) {
        if ($('[name="rePwd"]').val() !== value) {
            return '两次输入的密码不一致!'
        }
    }
});

$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $('.layui-form').serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            $('.layui-form')[0].reset();
        }
    })
})