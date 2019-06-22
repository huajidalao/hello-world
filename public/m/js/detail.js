
$(function(){
    // 利用传递过来的id来渲染对应上面的详情
    function getParamsByUrl(url,name) {
        //将页面的keywords获得
        var params = url.substr(url.indexOf("?")+1);
        //获得？后面的键值对了，然后用&打断
        var param = params.split("&");
        //这样param是只有键值对=，的数组
        for(var i=0;i<param.length;i++) {
            var current = param[i].split("=");
            if(name == current[0]) {
                return current[1];
            }
        }
        //如果没有符合的,返回false
        return false;
    }

    // 先得到url里的参数
    var id = getParamsByUrl(location.href,"id");
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {id},
        success: function(res) {
            var html = template("template",res);
            console.log(res)
            $("#contentBox").html(html);
            window.num = res.num;
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });


    // 利用事件委托给尺码添加事件
    $("#contentBox").on("tap",".sizeBox span",function(){
        var size = Number($(this).text());
        console.log(size)
        window.size = size;
        $(this).siblings().css({
            backgroundColor : ""
        });
        this.style.backgroundColor = "orange";
    });

    //点击加入购物车
    $("#contentBox").on("tap","#addCart",function(){
        var productId = id;
        var num = $(".numBox input").val();
        console.log(num)
        if(!size) {
            mui.toast("选择尺码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {productId,num,size},
            success: function(res) {
                if(res.success) {
                   mui.confirm("去往购物车吗",function(message){
                       if(message.index==1) {
                           alert("ok");
                       } else {
                           location.reload();
                       }
                   }) 
                }
            }
        })
    });


    //给数量添加和减少弄事件
    $("#contentBox").on("click","#reduce",function(){
       
        var num = $(".numBox-inp").val();
        num--;
        if(num<1) {
            num = 1;
        }
        $(".numBox-inp").val(num);
    });
    $("#contentBox").on("click","#increase",function(){
       
        var sum = $(".numBox-inp").val();
        sum++;
        if(sum>num) {
            sum = num;
        }
        $(".numBox-inp").val(sum);
    })
})