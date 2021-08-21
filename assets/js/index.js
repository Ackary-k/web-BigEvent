
$(function () {

    getUserInfo();

    let layer = layui.layer;
    // 实现退出功能
    $('#exit-btn').on('click', function () {

        layer.confirm('您确定退出吗?', {icon: 3, title:'提示'}, function(index){

            // 清空本地存储
            localStorage.removeItem('token');
            location.href = '../../login.html';
            // 关闭询问框
            layer.close(index);

        });

    });

})

function getUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {

            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            renderAvatar(res.data);
            console.log(localStorage.getItem('token'));
        },
        
        /** 
         * 不管权限接口调用成功与否都会指定 complete 函数, 且会调用
         * 所以可以在 baseAPI 中统一配置
        */
        /* complete: function (res) {
            console.log(res.responseJSON);
            if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '../../login.html';
            }
        } */
    });

}

function renderAvatar(userInfo) {
    
    let uname = userInfo.nickname || userInfo.username;
    $('#welcome').html(`欢迎&nbsp;&nbsp${ uname }`);

    // 根据数据选择头像
    if (userInfo.user_pic === null) {
        // 没有图像显示文字头像
        $('.text-avatar').html(uname[0].toUpperCase()).siblings('.layui-nav-img').hide();
    } else {
        // 否则显示图片头像
        $('.layui-nav-img').attr('src', userInfo.user_pic).siblings('.text-avatar').hide();
    }
}

