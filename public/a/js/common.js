$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    async: false,
    success: function (res) {
        if (res.success) {

        } else {
            location.href = "login.html";
        }
    }
})

$(function () {
    //点击分类管理，然后打开下拉框
    $("#silderUl").on("click", function () {
        $("#silderUl-ul").slideDown();
    })
})