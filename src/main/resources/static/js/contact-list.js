$(function () {
    getcontlist();
    function getcontlist(e) {
        $.ajax({
            url: "/contacts/contactsList",
            type: "get",
            dataType: "json",
            success: function (data) {
                conList(data.contacts);
            }
        });
    }
    $('body').on('click', '#del_con', function (e) {
        var del_cont_id = e.target.dataset.id;
        $.ajax({
            url: "/contacts/delcontacts",
            async: false,
            cache: false,
            type: "get",
            dataType: 'json',
            data: {
                "cont_id":del_cont_id
            },
            success: function (data) {
                alert(data.msg);
                window.location.href = "/front/contact-list";
            }
        });
    })
    $("#query_sub").click(function () {
        var datemin = $("#datemin").val();
        var datemax = $("#datemax").val();
        var query_cust_name = $("#query_cust_name").val();
        $.ajax({
            url: "/contacts/querycontacts",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "cust_name": query_cust_name,
                "datemin": datemin,
                "datemax": datemax
            },
            success: function (data) {
                conList(data.contacts);
            }
        });
    });
    function conList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                +'<td>'+item.cont_id+'</td>'
                +'<td><a data-id="'+item.cont_id+'" id="con_cus">'+item.customers.cust_name+'</a></td>'
                +'<td >'+item.cont_name+'</td>'
                +'<td>'+item.cont_dept+'</td>'
                +'<td >'+item.cont_mobile+'</td>'
                +'<td>'+item.create_time.substring(0, 10)+'</td>'
                +'<td><a data-id="'+item.cont_id+'" id="del_con">删除</a></td></tr>'
            $('#contacts_list').html(html);
        })
    }
    $('body').on('click', '#con_cus', function (e) {
        var cont_id = e.target.dataset.id;
        window.location.href = "/front/contact-update?cont_id="+cont_id;
    })
});