

$(function(){
    //先渲染页面
    var page = 1;
    var pageSize = 10;
    var totalPage = 1;
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page,pageSize
            },
            success:function (res) {
                console.log(res)
                var html = template("categoryTpl",res);
                $("#categoryBox").html(html);
                totalPage = Math.ceil(res.total / pageSize);
            }
        })
    }
    render();
    //然后做分页效果，根据页码渲染不同的数据
    $("#nextBtn").on("click",function(){
        page++;
        if(page > totalPage) {
            page = totalPage;
            alert("这是最后一页了");
            return;
        }
        render();
    })

    // 点击上一页的效果
    $("#prevBtn").on("click",function(){
        page--;
        if(page < 1) {
            page = 1;
            alert("已经是第一页了");
            return;
        }
        render();
    })

    //然后做添加一级分类，就是添加分类的名字
    $("#addCategory").on("click",function(){
        var categoryName = $("#categoryName").val().trim();
        if(!categoryName) {
            alert("请输入分类名字");
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: {
                categoryName
            },
            success:function (res) {
               if(res.success) {
                   location.reload();
               } else {
                   alert(res.message);
               }
            }
        })
    })

    //如果点击取消就是什么也不用做，然后隐藏模态框就行了
    $(".modal-footer button:eq(0)").on("click",function () {
        $(".category-first.modal").slideUp();
      
    })

})