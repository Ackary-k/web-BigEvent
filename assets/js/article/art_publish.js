// 获取文章分类, 初始化文章类别; initEditor 初始化富文本
getArtClasses();
initEditor();

let layer = layui.layer;
let form = layui.form;
// 图片裁剪效果
let $image = $('#image')
let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
}

$image.cropper(options);

$('#btnChooseImage').on('click', function () {
    $('#coverFile').click();
})

$('#coverFile').on('change', function (e) {
    let files = e.target.files;
    if (this.length === 0) {
        return
    }

    let newImgURL = URL.createObjectURL(files[0]);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
})

let art_state = '已发布';

$('#btn-save').on('click', function () {
    art_state = '草稿';
})

// 给表单注册 submit 提交事件
$('#form-pub').on('submit', function (e) {
    e.preventDefault();

    let fd = new FormData(this);
    fd.append('state', art_state);

    $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      // 5. 将文件对象，存储到 fd 中
      fd.append('cover_img', blob)
      // 6. 发起 ajax 数据请求
      publishArticle(fd);
    })

})

function getArtClasses() {

    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取数据失败!')
            }
            let htmlStr = template('tpl-cate', res);
            $('[name=cate_id]').html(htmlStr);
            
            // 固定方法, 若不调用即使有 option 也看不到
            form.render();
        }
    });

}

function publishArticle(fd) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.status !==0) {
                return layer.msg('文章发表失败, 请重试!')
            }
            layer.msg('发表成功!');
            // location.href = '/article/art_list.html';
        },
    })
}

