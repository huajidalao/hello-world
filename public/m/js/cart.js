

$(function(){
    $.ajax({
        type: "get",
        url: "/cart/queryCart",
        success: function (res) {
            console.log(res);
            if(res.length) {
                var html = template("cartTmp",{res: res});
                $("#cartBox").html(html);
                window.result = res;
            }
        }
    });
    $("#cartBox").on("click",".deleteBtn",function(){
        var id = $(this).attr("data-cartId");
        var This = $(this);
        $.ajax({
            type: "get",
            url: "/cart/deleteCart",
            data: {id: [id]},
            success: function (res) {
                // location.reload();
                if(res.success) {
                   This.parents("li").remove();
                }
                
            }
        })
    });
    
    var shoeSize = null;
    var Newresult = null;
    var shoeSort = null;
    $("#cartBox").on("tap",".editBtn",function(){
        $("#flow")[0].style.display = "block";
        var sort = $(this).attr("data-sort");
        //应该是我想编辑谁就把id传给他,我可以构建一个新的对象传给他啊
        var html2 = template("editCart",result[sort]);
        $("#flow").html(html2);
        Newresult = result[sort];
       
        //弹出来之后才能点击-+
        $("#flow").on("tap","#reduce",function(){
            console.log(415)
            var sum =$("#flow .detail-num input").val();
            sum--;
            if(sum<1) {
                sum = 1;
            }
            $("#flow .detail-num input").val(sum);
        });
        $("#flow").on("tap","#increase",function(){
            var sum = $("#flow .detail-num input").val();
            sum++;
            if(sum>Newresult.size) {
                sum = Newresult.size;
            }
            $("#flow .detail-num input").val(sum);
        });
        if (shoeSort) {
            $('.detail-size span').eq(shoeSort).css({
                backgroundColor: "orange"
            }).siblings().css({
                backgroundColor: ""
            }    
            )   
        }
    })

    //现在弹框出来了，该给弹框加点击事件了
    $("#flow").on("tap",".detail-size span",function() {
        $(this).siblings("span").css({
            backgroundColor : "",
        });
        this.style.backgroundColor = "orange";
        //记录上最后选中的尺码
        shoeSize = $(this).text();
        shoeSort = $('.detail-size span').indexOf($(this)[0]);
        console.log(shoeSort);


    })
    //给确认加事件
    $("#flow").on("tap","#conform",function() {
        //那这里就不需要用自定义属性了，因为被选出来的那个商品已经被弄成了全局变量
        var id = Newresult.id;
        var size = Newresult.size;
        if(shoeSize) {
            size = shoeSize;
        }
        var num =  $("#flow .detail-num input").val();
        var This = this;
        $.ajax({
            type:"post",
            url: "/cart/updateCart",
            data: {id,size,num},
            async: false,
            success: function (res) {
                if(res.success) {
                //  location.reload();
                $(".shoeNums span").text("x"+num+"双");
                $(".shoeSize span").text("鞋码："+size);
                $(This).parents("#flow").css({
                    display: "none"
                })
                }
            }
        });
    });

    $("#flow").on("tap","#quxiao",function() {
    $(this).parents("#flow").css({
        display: "none"
    })
    })
    
    
})

