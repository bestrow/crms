$(function () {
    getcustlist();
    function getcustlist(e) {
        $.ajax({
            url: "/customers/getAllCustomers",
            type: "get",
            dataType: "json",
            success: function (data) {
                custList(data.Customers);
            }
        });
    }
    function custList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<option value="'+item.customer_id+'">'+item.cust_name+'</option>';
            $('#cust_name').html(html);
        })
    }
    $('#contact_sub').click(function () {
        var cust_id = $('#cust_name option:selected').val();
        var cont_name = $('#cont_name').val();
        var cont_dept = $('#cont_dept').val();
        var cont_position = $('#cont_position').val();
        var cont_telephone = $('#cont_telephone').val();
        var cont_mobile = $('#cont_mobile').val();
        var cont_email = $('#cont_email').val();
        var cont_qq = $('#cont_qq').val();
        var tech_degree = $('#tech_degree option:selected').val();
        var more_info = $('#more_info').val();
        $.ajax({
            url: "/contacts/addcontacts",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "cust_id": cust_id,
                "cont_name": cont_name,
                "cont_dept": cont_dept,
                "cont_position":cont_position,
                "cont_telephone":cont_telephone,
                "cont_mobile":cont_mobile,
                "cont_email":cont_email,
                "cont_qq":cont_qq,
                "tech_degree": tech_degree,
                "more_info": more_info
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    })
});