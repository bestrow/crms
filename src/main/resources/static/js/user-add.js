$(function () {
    var addUrl = "/users/addUsers";
    $("#sub").click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var confirmpassword = $('#confirmpassword').val();
        var sex = $("input[name='sex']:checked").val();
        var birthday = $('#birthday').val();
        var authority = $('#authority option:selected').val();
        if (confirmpassword == password) {
            $.ajax({
                url: addUrl,
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    "username": username,
                    "password": password,
                    "sex": sex,
                    "birthday": birthday,
                    "authority": authority
                },
                success: function (data) {
                        alert(data.msg);
                }
            });
        } else {
            alert("两次密码输入不一致");
        }
    });
    $("#check_username").click(function () {
        var username = $('#username').val();
        $.ajax({
            url: "/users/checkname",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "username": username,
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    });
});