$(function () {
    var loginUrl = '/users/login';
    $('#sub').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: loginUrl,
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {"username": username, "password": password},
            success: function (data) {
                if (data.success) {
                    window.location.href = "/front/home";
                } else {
                    alert(data.msg);
                }
            }
        });
    });
});
