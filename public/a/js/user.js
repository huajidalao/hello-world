

$(function(){
    //渲染用户
    var page = 1;
    var pageSize = 10;
    $.ajax({
        type:"get",
        url: "/user/queryUser",
        data: {
            page,pageSize
        },
        success: function (res) {
            console.log(res)
            var html = template("userTpl",res);
            $("#userBox").html(html);
        }
    });


    //点击退出，然后登录退出
    $("#loginOut").on("click",function(){
        $.ajax({
            type: "get",
            url:"/employee/employeeLogout",
            success: function (res) {
               if(res.success) {
                   location.href = "login.html";
               } else {
                   alert(res.message);
               }
            }
        })
    });

    //用户状态更新，逻辑是切换谁的状态，以及判断状态是什么样的
    //确定谁是通过id，而id是在一开始渲染页面的时候就传进来了
    //判断状态是根据之前的状态
    $("#userBox").on("click","button",function(){
        var id = $(this).attr("data-id");
        //isDelete是字符串，所以第二个参数传进去的是点击后的状态
        var isDelete = $(this).attr("data-isDelete");
        isDelete = isDelete == 1 ? 0 : 1;
        console.log(id,isDelete);
        $.ajax({
            url: "/user/updateUser",
            type: "post",
            data: {id,isDelete},
            success: function (res) {
                console.log(res);
                //因为数据库里并没有去修改isDelete,所以需要自己手动给
                if(res.success) {
                    location.reload();
                } else {
                    alert(res.message);
                }
            }
        })
    });


    
})