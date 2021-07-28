$(function(){
    var layer =layui.layer
    var form =layui.form
    initArtCateList()
    //获取文章分类列表
    function initArtCateList(){
 $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function (res) {
            // console.log(res);
            var htmlStr=template('tpl-table',res)
            $('tbody').html(htmlStr)
        }
    });
    }
    var indexadd=null
  $('#btnAddCate').on('click',function(){
      indexadd=layer.open({
    type:1,
    title:'添加文章分类',
    content:$('#add').html(),
    area:['500px','250px']
})
  })
  //代理为表单绑定事件(表单是后创建的)
  $('body').on('submit','#form-add',function(e){
      e.preventDefault()
      $.ajax({
          type: "post",
          url: "/my/article/addcates",
          data: $(this).serialize(),
          success: function (res) {
              if(res.status !==0){
                  return layer.msg('新增分类失败!')
              }
              initArtCateList()
              layer.msg('新增分类成功!')
              layer.close(indexadd)//根据索引关闭弹出层
          }
      });
  })
var indexedit
  //编辑按钮的代理点击事件
  $("tbody").on('click','.btn-edit',function(){
      //弹出修改
    indexedit=layer.open({
        type:1,
        title:'修改文章分类',
        content:$('#edit').html(),
        area:['500px','250px']
    })
    var id =$(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type: "GET",
        url: '/my/article/cates/'+id,
        success: function (res) {
        //    console.log(res); 
           form.val('form-edit',res.data)
        }
    });
  })

  $('body').on('submit','#form-edit',function(e){
      e.preventDefault()
      $.ajax({
          type: "post",
          url: "/my/article/updatecate",
          data: $(this).serialize(),
          success: function (res) {
              if(res.status !==0){
                  return layer.msg('更新分类数据失败')
              }
              layer.msg('更新分类数据成功')
              layer.close(indexedit)
              initArtCateList()
          }
      });
  })
//   删除按钮
  $('tbody').on('click','.btn-delete',function(){
    //   console.log('ok');
    var id=$(this).attr('data-id')
    layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type: "get",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if(res.status !==0){
                    return layer.msg('删除分类失败') 
                }
                layer.msg('删除分类成功')
                initArtCateList()
            }
        });
        
        layer.close(index);
      });
  })
})