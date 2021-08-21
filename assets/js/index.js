$(function () {
    getUserInfo();
})

function getUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            renderAvatar(res.data);
        }
    });

}

function renderAvatar(userInfo) {
    
    let uname = userInfo.nickname || userInfo.username;
    $('#welcome').html(`欢迎&nbsp;&nbsp${ uname }`);

    // 根据数据选择头像
    if (userInfo.user_pic === null) {
        // 显示文字头像
        $('.text-avatar').html(uname[0].toUpperCase()).siblings('.layui-nav-img').hide();
    } else {
        // 显示图片头像
        $('.layui-nav-img').attr('src', userInfo.user_pic).siblings('.text-avatar').hide();
    }
}