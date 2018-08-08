$(document).ready(function () {
    $.getJSON("/logs/getcustname", function (data) {
        var htmlstr = "";
        $.each(data, function (infoindex, info) {
            htmlstr += "<option value=" + info + ">" + info + "</option>";
        })
        $("#cust_name").html(htmlstr);
    });
    (function ($) {
        $.getUrlParam
            = function (name) {
            var reg
                = new RegExp("(^|&)" +
                name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);//用这个方法可以提取url参数
    var log_id = $.getUrlParam("log_id");
    var url = "/logs/findlog?" + "log_id=" + log_id;
    $.getJSON(url, function (data) {
        var title = data.title;
        var cust_name = data.cust_name;
        var desc = data.desc;
        var create_time = new Date(data.create_time).toLocaleDateString();
        var str = create_time.split("/");
        if (str[1] <= 9)
            str[1] = "0" + str[1];
        if (str[2] <= 9)
            str[2] = "0" + str[2];
        var dateStr = str[0] + "-" + str[1] + "-" + str[2];
        $("#cust_name").val(cust_name);
        $("#title").val(title);
        $("#desc").val(desc);
        $("#create_time").val(dateStr);
    });
    $("#submit").click(function () {
        var log_id = $.getUrlParam("log_id");
        var title = $("#title").val();
        var desc = $("#desc").val();
        var cust_name = $("#cust_name").val();
        var create_time = $("#create_time").val();
        if (create_time != null) {
            create_time = new Date($("#create_time").val()
                .replace(/-/g, '/'));
        }
        $.ajax({
            url: "/logs/editlog",
            type: "get",
            dataType: "json",
            data: {
                "log_id": log_id,
                "title": title,
                "desc": desc,
                "cust_name": cust_name,
                "create_time": create_time
            },
            success: function (data) {
                if (data.isSuccess) {
                    window.location.href = "/front/log-list";
                } else {
                    alert("修改失败");
                }
            }
        })
    });
});