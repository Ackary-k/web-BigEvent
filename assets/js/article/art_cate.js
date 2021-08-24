let layer = layui.layer;

initArtCateList()

function initArtCateList() {

    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取数据失败!')
            }
            let tbodyStr = template('tpl-table', res);
            $('tbody').html(tbodyStr);
        }
    });

}

let idxAdd = null;
$('#btnAddCate').on('click', function () {

    // layer.open() 会返回索引
    idxAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章类别',
        content: $('#dialog-add').html(),
    });

});


// 事件委托, 给 form-add 绑定 submit 事件
$('body').on('submit', '#form-add', function (e) {

    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $('#form-add').serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('添加失败!')
            }
            layer.msg('添加成功!');
            initArtCateList();
            layer.close(idxAdd);
        }
    });

});



$('body').on('click', '#btn-delete', function () {

    let id = $(this).attr('data-id');

    layer.confirm('确认删除吗?', {icon: 3, title:'提示'}, function(index){

        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除数据失败!');
                }
                layer.msg('删除数据成功!');
                initArtCateList();
            }
        })
        
        layer.close(index);
    });
    
    

});

let idxEdit = null;

$('body').on('click', '#dialog-edit', function () {

    let id = $(this).attr('data-edit-id');

    idxEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章类别',
        content: $('#form-dialog-edit').html(),
    });

    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            
            /**
             * 快速填充表单: 
             *  1. 给 form 表单定义 lay-filter 属性 
             *  2. layui.form.val('属性值', res.data)
            */ 
            layui.form.val('form-edit-classfiy', res.data);

        }
    });

});

$('body').on('submit', '#form-edit', function (e) {

    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('修改数据失败!');
            }
            layer.msg('修改信息成功!');
            initArtCateList();
            layer.close(idxEdit);
        }
    });

})