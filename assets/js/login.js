$('#to-login').on('click', function () {
    $('.login-box').hide().siblings('.reg-box').show();
})

$('#to-register').on('click', function () {
    $('.reg-box').hide().siblings('.login-box').show();
})