/**
 * 查询参数对象
 * pagenum: 页码值
 * pagesize: 每页显示多少条数据
 * cate_id: 文章分类的 Id
 * state: 文章的状态，可选值有：已发布、草稿
 */
let q = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: '',
}
let layer = layui.layer;
let form = layui.form;

template.defaults.imports.dataForamt = function (date) {

    const dt = new Date(date);

    let y = dt.getFullYear();
    let m = padZero(dt.getMonth() + 1);
    let d = padZero(dt.getDate());

    let HH = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());

    return `${ y }-${ m }-${ d } ${ HH }:${ mm }:${ ss }`;
                
}

initTable();
initCate();

// 筛选表单
$('#form-search').on('submit', function (e) {

    e.preventDefault();

    let cate_id = $('[name=cate_id]').val();
    let state = $('[name=state]').val();

    q.cate_id = cate_id;
    q.state = state;

    initTable();
    
})

// 事件委托, 删除按钮
$('tbody').on('click', '.btn-delete', function () {

    let id = $(this).attr('data-id');
    let len = $('.btn-delete').length;

    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除失败!')
                }
                layer.msg('删除成功!');
                if (len === 1) {
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                }
                initTable();
            }
        })
        
        layer.close(index);
    });
})

$('tbody').on('click', '.btn-edit', function () {
    layer.alert('该功能暂未完成!');
})

function initTable() {

    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            if (res.status !==0) {
                return layer.msg('获取数据失败!');
            }

            let htmlStr = template('tpl-table', res);

            $('tbody').html(htmlStr);
            renderPage(res.total);

        }
    });
}

function initCate() {

    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !==0) {
                return layer.msg('获取数据失败!');
            }

            let htmlStr = template('tpl-cate', res);

            $('[name=cate_id]').html(htmlStr);
            form.render();

        }
    });

}

function padZero(n) {
    return n > 9 ? n : '0' + n;
}

function renderPage(total) {


    // layui 分页方法
    layui.laypage.render({
        elem: 'page-box',
        count: total,
        limit: q.pagesize,
        curr: q.pagenum,
        /**
         * 分页切换时, 触发 jump 回调函数的方法有 2 种: 
         * 1. 点击页码的时候触发
         * 2. 只要调用 laypage.render() 就会触发 jump 回调
         * @param {*} obj 包含了当前分页的所有参数
         * @param {*} first 判断通过哪种方式触发
         *  first: true: 第2 种方式, 否则就是第 1 种方式触发
         */
        jump: function (obj, first) {
            // 把最新的页码值给 q; 把最新的条目数给q
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            if (!first) {
                initTable();
            }
        },
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip',],
        limits: [2, 3, 5, 10],
    });

}