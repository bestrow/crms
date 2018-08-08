$(function () {
    getcustlist();
    getlist();
    var cont_id;
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
    function getlist(e) {
        cont_id  = getQueryString("cont_id");
        $.ajax({
            url: "/contacts/selectcontacts",
            type: "post",
            dataType: 'json',
            data: {
                "cont_id": cont_id
            },
            success: function (data) {
                var contact = data.contact;
                $('#cust_name').val(contact.cust_id);
                $('#cont_name').val(contact.cont_name);
                $('#cont_dept').val(contact.cont_dept);
                $('#cont_position').val(contact.cont_position);
                $('#cont_telephone').val(contact.cont_telephone);
                $('#cont_mobile').val(contact.cont_mobile);
                $('#cont_email').val(contact.cont_email);
                $('#cont_qq').val(contact.cont_qq);
                $('#tech_degree').val(contact.tech_degree);
                $('#more_info').val(contact.more_info);
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
    $('#update_sub').click(function () {
        cont_id  = getQueryString("cont_id");
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
            url: "/contacts/updatecontacts",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "cont_id":cont_id,
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
                if(data.success){
                    alert("修改成功！");
                    window.location.href = "/front/contact-list";
                }else {
                    alert("修改失败！");
                }
            }
        });
    })
})