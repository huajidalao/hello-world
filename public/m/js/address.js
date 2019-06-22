
$(function(){
    $("#addAddress").on("click",function(){
        setTimeout(function(){
            location.href="addAddress.html";
        },1000);
    });

    // 加载出所有的地址
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(res) {
            console.log(res)
            if(res) {
                window.address = res;
                var html = template("addtemp",{result: res});
                $(".my-good").append(html);
            }
        }
    });


    //开始做删除操作
    $(".my-good").on("tap","#delete",function(){
        console.log(324234)
        var id = $(this).attr("data-id");
        var li = $(this).parents("li")[0];
        //还需要一个确认框
        mui.confirm("确认需要删除吗",function(message){
            console.log(message);
            if(message.index==1) {
                //因为这是模拟的弹窗，取消是0，确认是1
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res) {
                       //直接刷新页面
                       location.reload();
                    }
                }) 
            } else {
                //把li这个缩回去
                mui.swipeoutClose(li);
            }
        })
    });

    //做编辑
    $(".my-good").on("tap","#idet",function () {
        //是找到相应的id对应的值，然后存在本地里
        var id = $(this).attr("data-id");
        for(var i=0;i<address.length;i++) {
            if(id==address[i].id) {
                console.log(address[i]);
                //找到id对应的了,然后将内容存到本地里，以json格式
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            } 
        }
       
        // 保存到本地之后，然后跳转
        location.href = "addAddress.html?isEdit=1"; //修改是1
    })

})