$(function () {
    changeName();
    function changeName() {
        $.ajax({
            url: "/users/session",
            type: "post",
            dataType: "json",
            success: function (data) {
                $("#index_name").text(data.session);
            }
        });
    }
});
