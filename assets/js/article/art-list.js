$(function(){
    var layer =layui.layer
    var form=layui.form
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
    
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
    
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
    
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      }
    
      // 定义补零的函数
      function padZero(n) {
        return n > 9 ? n : '0' + n
      }
    var q ={
        pagenum:1,//页码值
        pagesize:2,//每页显示数据
        cate_id:'', //文章分类id
        state:''//文章发布状态
    }
initTable()
initCate()
    //获取文章列表数据方法
    function initTable(){
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                // console.log(res);
                if(res.status !==0){
                 return layer.msg('获取文章列表失败')
                }
                //使用模板引擎渲染
                var htmlstr=template('tpl-table',res)
                $('tbody').html(htmlstr)
                renderPage(res.total)//分页方法传递信息条数
            }
        });
    }
    //文章分类
    function initCate() {
        $.ajax({
          method: 'GET',
          url: '/my/article/cates',
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('获取分类数据失败！')
            }
            // 调用模板引擎渲染分类的可选项
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 通过 layui 重新渲染表单区域的UI结构
            form.render()
          }
        })
      }
    
      // 为筛选表单绑定 submit 事件
      $('#form-search').on('submit', function(e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
      })
    //   定义分页方法
    function renderPage(total){
// console.log(total);
     laypage.render({
         elem:'pageBox',  //容器id
         count:total,    //总条数
         limit:q. pagesize, //每页显示数据
         curr:q.pagenum,   //默认被选中分页
         layout:['count','limit','prev','page','next','skip'],
         limits:[2,3,5,10],
         //回调得到变化的页码值
         jump:function(obj,first){
            //  把最新页码值赋值给q
            q.pagenum=obj.curr
            q.pagesize=obj.limit
            if(!first){
                initTable()
            }
         }
     })
    }

    // 删除按钮的事件
    $('tbody').on('click','.btn-delete',function(){
        //   console.log('ok');
        var len =$('.btn-delete').length//删除按钮个数
        // console.log(len);
        var id=$(this).attr('data-id')
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if(res.status !==0){
                        return layer.msg('删除分类失败') 
                    }
                    layer.msg('删除分类成功')
                    // 判断数据这一页是否全部删除
                    if(len===1){
                        //三元运算不能让页码小于一
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                }
            });
            
            layer.close(index);
          });
      })
})