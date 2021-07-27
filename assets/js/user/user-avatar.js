$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //上传按钮绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //change事件更换裁剪区图片
    $('#file').on('change', function (e) {
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片!')
        }
        //拿到用户选择文件
        var file = e.target.files[0]
        //将文件转化为url地址
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //上传头像功能(确定按钮)
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换失败!')
                }
                layer.msg('更换成功')
                //更新父界面
                window.parent.getUserInfo()
            }
        });
    })
})