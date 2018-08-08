$(function () {
	getlist();
    function getlist(e) {
    	var myDate = new Date();
    	document.getElementById("create_time").value= myDate.toLocaleDateString();
    	document.getElementById("user_name").value="admin";
	}
    $("#submit").click(function () {
        var cust_name = $('#cust_name').val();
        var cust_type = $('#cust_type').val();
        var cust_background = $('#cust_background').val();
        var listed = $('#listed').val();
        var reg_capital = $('#reg_capital').val();
        var year_sales = $('#year_sales').val();
        var entp_scale = $('#entp_scale').val();
        var tester_no = $('#tester_no').val();
        var url = $('#url').val();
        var zip_code = $('#zip_code').val();
        var address = $('#address').val();
        var main_products = $('#main_products').val();
        var major_services = $('#major_services').val();
        var status = $('#status').val();
        var user_name = $('#user_name').val();
        var create_time = $('#create_time').val();
        if(cust_name == ''){
        	alert("公司名称不能为空！")
        }else if(reg_capital == ''){
        	alert("注册资本不能为空！")
        }else{
        	$.ajax({
                url: "/customers/addCustomer",
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    "cust_name": cust_name,
                    "cust_type": cust_type,
                    "cust_background": cust_background,
                    "listed": listed,
                    "reg_capital": reg_capital,
                    "year_sales": year_sales,
                    "entp_scale": entp_scale,
                    "tester_no": tester_no,
                    "url": url,
                    "zip_code": zip_code,
                    "address": address,
                    "main_products": main_products,
                    "major_services": major_services,
                    "status": status,
                    "user_name": user_name,
                    "create_time": create_time,
                },
                success: function (data) {
                        alert(data.msg);
                }
            });
        }
    });
});