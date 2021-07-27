$(function(){
getUserInfo()
//退出按钮
var layer=layui.layer;
$('#btnLogout').on('click',function(){
    // //layui里面的弹出的询问框
    layer.confirm('确定退出登录', {icon: 3, title:'提示'},
     function(index){
        //do something
        //清空本地存储和跳转登录界面
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });
   
})
})


//获取用户基本信息函数
function getUserInfo(){
$.ajax({
    type: "get",
    url: "/my/userinfo",
    
    // headers:{
    //     Authorization:localStorage.getItem('token')||''
    // },
    success:function (res) {
        // console.log(res);
        if(res.status !==0){
            return layui.layer.msg('获取用户信息失败!')
        }
        // console.log(res);
        //调用renderAvatar渲染用户头像
        renderAvatar(res.data)
        
    },
    //不论成功失败都会调用 complete
    // complete:function(res){
    //     console.log(res);
    //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败!'){
    //         localStorage.removeItem('token')
    //         location.href='/login.html'
    //     }
    // }
});
}

// 渲染头像函数
function renderAvatar(user){
    // 获取用户名称
var name =user.nickname || user.username;
$('#welcome').html('欢迎&nbsp &nbsp;'+name)
//渲染用户头像
if(user.user_pic !==null){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
}else{
    $('.layui-nav-img').hide()
    var first=name[0].toUpperCase()//获取第一个字符转大写
    $('.text-avatar').html(first).show
}
}