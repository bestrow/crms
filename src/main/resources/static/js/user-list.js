$(function () {
    getlist();

    function getlist(e) {
        $.ajax({
            url: "/users/listUsers",
            type: "get",
            dataType: "json",
            success: function (data) {
                userList(data.users);
            }
        });
    }

    $("#queryAll").click(function () {
        var select_username = $("#select_username").val();
        var select_sex = $('#select_sex option:selected').val();
        var datemin = $("#datemin").val();
        var datemax = $("#datemax").val();
        var select_role = $('#select_role option:selected').val();
        var select_status = $('#select_status option:selected').val();
        $.ajax({
            url: "/users/selectUsers",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "select_username": select_username,
                "select_sex": select_sex,
                "datemin": datemin,
                "datemax": datemax,
                "select_role": select_role,
                "select_status": select_status,
            },
            success: function (data) {
                userList(data.users);
            }
        });
    })

    function userList(data) {
        var html = '';
        data.map(function (item, index) {
            var role;
            if (item.role_id === 1) {
                role = "系统管理员";
            } else if (item.role_id === 2) {
                role = "业务经理";
            } else {
                role = "销售";
            }
            html += '<tr class="text-c">'
                + '<td>' + item.user_id + '</td> '
                + '<td><a id="edit_user" data-id="'+item.user_id+'">' + item.user_name + '</a> </td>'
                + '<td>' + (item.sex === "0" ? "女" : "男") + '</td> '
                + '<td >' + item.birthday.substring(0, 10) + '</td>'
                + '<td >' + role + '</td>'
                + '<td>' + (item.status === 1 ? "正常" : "禁用") + '</td>'
                + '<td><a id="edit" data-name="'+item.user_name+'">修改分配角色</a>&nbsp;&nbsp;<a id="del_user" data-name="'+item.user_name+'">删除</a></td>' +
                '</tr>';
            $('#user-list').html(html);
        })
    }

    $('body').on('click', '#edit', function (e) {
        var editRole;
        var editname = e.target.dataset.name;
        $('#dialog').dialog({
            resizable: false,
            height: 160,
            modal: true,
            buttons: {
                "确定": function () {
                    editRole = $('#edit_select_role option:selected').val();
                    $.ajax({
                        url: "/users/editUsers",
                        async: false,
                        cache: false,
                        type: "post",
                        dataType: 'json',
                        data: {
                            "editname":editname,
                            "editRole":editRole
                        },
                        success: function (data) {
                            alert(data.msg);
                            window.location.href = "/front/user-list";
                        }
                    });
                    $(this).dialog("close");
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        })
    })
    $('body').on('click', '#del_user', function (e) {
        var del_user_name = e.target.dataset.name;
        $.ajax({
            url: "/users/delUsers",
            async: false,
            cache: false,
            type: "get",
            dataType: 'json',
            data: {
                "del_user_name":del_user_name
            },
            success: function (data) {
                alert(data.msg);
                window.location.href = "/front/user-list";
            }
        });
    })
    $('body').on('click', '#edit_user', function (e) {
        var userid = e.target.dataset.id;
        window.location.href = "/front/user-update?userid="+userid;
    })
});