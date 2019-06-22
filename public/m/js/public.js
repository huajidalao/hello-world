//因为mui阻挡了a标签的跳转功能，通过事件来重新开放
$(function(){
    $("body").on("tap","a",function(){
        var url = this.href;
        if(url) {
            mui.openWindow({
                url: url
            }) 
        } 
    })

    
})