$(function () {
    getlist();
    var userid;
    function getlist(e) {
        userid  = getQueryString("userid");
        $.ajax({
            url: "/users/selectuser",
            type: "post",
            dataType: 'json',
            data: {
                "userid": userid
            },
            success: function (data) {
                var users = data.users;
                $('#username').val(users.user_name);
                $('#password').val(users.password);
                if (users.sex == "0") {
                    $("#six_0").attr("checked","checked");
                }else {
                    $("#six_1").attr("checked","checked");
                }
                $('#birthday').val(users.birthday.substring(0, 10));
                $('#authority').val(users.role_id);
                $('#status').val(users.status);
            }
        });
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    }
    $("#sub").click(function () {
        userid  = getQueryString("userid");
        console.log("sub: "+userid);
        var username = $('#username').val();
        var password = $('#password').val();
        var sex = $("input[name='sex']:checked").val();
        var birthday = $('#birthday').val();
        var authority = $('#authority option:selected').val();
        var status = $('#status option:selected').val();
            $.ajax({
                url: "/users/updateuser",
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    "userid":userid,
                    "username": username,
                    "password": password,
                    "sex": sex,
                    "birthday": birthday,
                    "authority": authority,
                    "status":status
                },
                success: function (data) {
                  if(data.success){
                      alert("修改成功！");
                      window.location.href = "/front/user-list";
                  }else {
                      alert("修改失败！");
                  }
                }
            });
    });
})