
$(function(){
    var page = 1;
    var pageSize = 10;
    var totalPage = 1;
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page,pageSize
            },
            success:function (res) {
                console.log(res)
                if(res.rows.length>0) {
                    var html = template("categoryTpl",res);
                    $("#categoryBox").html(html);
                    totalPage = Math.ceil(res.total / pageSize);
                }
            }
        })
    }
    render();
    //然后是点击翻页
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

    // 然后做添加第二分类，模态框里的那个下拉框需要自己写模板
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 200
        },
        success:function (res) {
            console.log(res)
            if(res.rows.length>0) {
                var html2 = template("firstCategoryTpl",res);
                $("#firstCategory").html(html2);
            }
        }
    });

    //因为模态框里的第一个下拉框，到时候你选择到哪个，是要通过select的value获得的
    //先做上传图片，引入基于jquery的第三方插件
    var brandLogo = null;
    $("#fileUpload").fileupload({
        dataType: "json",
        done: function (e,data) {
            console.log(data.result.picAddr);
            //将预览图展示出来
            brandLogo = data.result.picAddr;
            $("#showBrand")[0].src = brandLogo;
        }
    })
    //图片上传成功

    //然后做添加按钮了，点击确认
    $("#addCategory").on("click",function(){
        var categoryId = $("#categoryId").val();
        var brandName = $("#brandName").val();
        console.log(categoryId);
        if(categoryId == "-1") {
            alert("请选择分类");
            return;
        }
        
        if(!brandName) {
            alert("请输入商品名称");
            return;
        }
        if(!brandLogo) {
            alert("请上传图片");
            return;
        }
        $.ajax({
            url: "/category/addSecondCategory",
            type: "post",
            data: {
                categoryId,brandName,brandLogo,
                hot: 1
            },
            success: function (res) {
                if(res.success) {
                    location.reload();
                } else {
                    alert(res.message);
                }
            }
        })
    })
   
    $(".modal-footer button:eq(0)").on("click",function () {
        $(".category-first.modal").slideUp();
      
    })

    

})