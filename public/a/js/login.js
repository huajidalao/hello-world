
$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success: function (res) {
        if(res.success) {
            location.href = "user.html";
        }
    }
})
$(function(){
    $("#loginBtn").on("click",function(){
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        if(!username) {
            alert("请输入用户名");
            return;
        }
        if(!password) {
            alert("请输入密码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username, password
            },
            success: function (res) {
                console.log(res);
                if(res.success) {
                    location.href = "user.html";
                } else {
                    alert(res.message);
                }
            }
        })
    })
})