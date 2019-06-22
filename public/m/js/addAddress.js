$(function () {
    $("#showCityPicker").on("click", function () {
        var picker = new mui.PopPicker({
            layer: 3
        });
        picker.setData(cityData);
        picker.show(function (selectItems) {
            console.log(selectItems); //智子
            var html = selectItems[0].text + selectItems[1].text + selectItems[2].text;
            $('#showCityPicker').val(html);
            console.log(html)
           
        })
    });
    //这个点击事件添加和修改都要用
   
    $("#addAdress").on("click",function(){
    var recipients = $('[name="recipients"]').val().trim();
    var address = $('[name="address"]').val().trim();
    var postcode = $('[name="postcode"]').val().trim();
    var addressDetail = $('[name="addressDetail"]').val().trim();
    var data = { address,addressDetail,recipients,postcode};
    if(isEdit=="1") { 
        data.id = id;
        var url = "/address/updateAddress";
        console.log(data)
    }
    if(!recipients) {
        mui.toast("请输入收货人");
        return;
    }
    if(!postcode) {
        mui.toast("请输入邮编");
        return;
    }
    if(!address) {
        mui.toast("请输入地址");
        return;
    }
    if(!addressDetail) {
        mui.toast("请输入详细地址");
        return;
    }
    
    $.ajax({
        type: "post",
        url: url,
        data: data,
        success: function(res) {
            console.log(res);
            if(res.success) {
                setTimeout(function(){
                    location.href="address.html"; 
                },1000)
            } else {
                location.reload();
            }
        }
    })
    })
    

    //然后直接从本地里取东西，渲染出来
    // 因为添加和修改操作都是用的一个页面所以要区分,修改是1，添加是0
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
    var isEdit = getParamsByUrl(location.href,"isEdit");
    console.log(isEdit)
    if(isEdit=="1") {
        //执行修改操作，先把东西渲染到页面上
        if(localStorage.getItem("editAddress")) {
            var editAddress = JSON.parse(localStorage.getItem("editAddress"));
            console.log(editAddress);
            window.id = editAddress.id;
            console.log(id)
            var html = template("idetTmp",editAddress);
            $(".mui-input-group").html(html);
        }
    }
})