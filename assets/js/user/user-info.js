$(function(){
     var form=layui.form
     var layer=layui.layer
     form.verify({
nikename:function (value){
  if(value.length>6){
      return '长度必须再1 ~ 6个字符之间'
  }
}
})
initUserInfo()
function initUserInfo(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status !== 0){
                return layes.msg('获取用户信息失败')
            }
            console.log(res);
            // 使用layui调用form.val()快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    });
}
//实现重置按钮
$('#btnResrt').on('click',function(e){
e.preventDefault()
initUserInfo()

})
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type: "post",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if(res.status !==0){
                return layer.msg('修改失败!')
            }
            layer.msg('修改成功!') 
            //调用父页面index.js中getUserInfo重新渲染头像
            window.parent.getUserInfo()
        }
    });
})
})