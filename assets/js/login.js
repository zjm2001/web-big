$(function(){
       //点击去注册账号链接
    $('#reg').on('click',function(){
         $('.login-box').hide()
         $('.reg-box').show()

    })
    //点击去登录
    $('#login').on('click',function(){
        $('.reg-box').hide()
       $('.login-box').show()
   })
   //从layui中获取from对象
   var form =layui.form;
   var layer=layui.layer;
//    通过form.verify创建自定义效验规则
   form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      //测试两次密码是否一致
      repwd: function(value){
          var pwd =$('.reg-box [name=password]').val()
          if(pwd!=value){
              return '两次密码不一致'
          }
      }
   })
//    监听注册表单提交
  $('#form-reg').on('submit',function(e){
    e.preventDefault();
      $.ajax({
          url:'/api/reguser',
          method:'post',
          data:{
              username:$('#form-reg [name=username]').val(),
              password:$('#form-reg [name=password]').val()
          },
          success:function(res){
              if(res.status !==0){
                  return layer.msg(res.message);   
              }
            //   layui内的弹出框  得先var声明 var layer=layui.layer;才能使用
              layer.msg('注册成功,请登录');
              //模拟点击
              $('#login').click()
          }
      })
  })
  //登录表单
  $('#form-login').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'/api/login',
        method:'post',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return layer.msg('登录失败!')
            }
            layer.msg('登录成功!');
            //权限信息
            console.log(res.token);
            localStorage.setItem('token', res.token)
            location.href='/index.html'
        }
    })
  })
})