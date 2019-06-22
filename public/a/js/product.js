
$(function(){
    //也是一出来就渲染页面
    var page = 1;
    var pageSize = 10;
    var totalPage = 1;
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page,pageSize
            },
            success:function (res) {
                
                if(res.rows.length>0) {
                    var html = template("productTpl",res);
                    $("#productBox").html(html);
                    totalPage = Math.ceil(res.total / pageSize);
                }
            }
        })
    }
    render();
    //翻页
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

    //再做上传图片,用第三方插件fileupload
    var productArr = [];
    //这里增加图片，是为了做预览图
    $("#fileUpload").fileupload({
        dataType : "json",
        done : function (e,data) {
            //因为后面点击添加商品的时候，因为要传多个图片，格式是用数组
            productArr.push(data.result);
            var html = "";
            productArr.forEach(function(i,value){
                html += `<img src="${i.picAddr}">`;
            })
            $("#imgBox").html(html);
        }
    })
    
    //给这个div加三个img
    
    //要渲染出品牌下拉框
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 1000
        },
        success: function (res) {
            if(res.rows.length>0) {
                console.log(res)
               var html = template("brandTpl",res);
               $("#brandBox").html(html);
            } else {
                alert(res.message);
            }
        }
    })

    $("#addProduct").on("click",function(){
        var proName = $("#productName").val();
        var oldPrice = $("#productOriginPrice").val();
        var price = $("#productNowPrice").val();
        var proDesc = $("#productDescription").val();
        var size = $("#productSize").val();
        var num = $("#productNum").val();
        var brandId = $("#productNum").val();
        var statu = 1;
        var brandId = $("#brandOptions").val();
        var pic = productArr;
        //前端校验
        if(brandId == "-1") {
            alert("请选择分类");
            return;
        }
        
        if(!proName) {
            alert("请输入商品名称");
            return;
        }
        if(!proDesc) {
            alert("请输入商品描述");
            return;
        }
        if(!num) {
            alert("请输入产品数量");
            return;
        }
        if(!size) {
            alert("请输入产品尺码");
            return;
        }
        if(!oldPrice) {
            alert("请输入产品原价");
            return;
        }
        if(!price) {
            alert("请输入产品折扣");
            return;
        }
       
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName, oldPrice,price,proDesc,size,num,brandId,statu,brandId,pic
            },
            success: function (res) {
                if(res.success) {
                    console.log(res)
                    location.reload();
                } else {
                    console.log(res.message);
                }
            }
        })
    })
})