$(function() {
	getCustomer();
	function getCustomer(e) {
		var name = getQueryString('name');
		$.ajax({
			url : "/customers/updateShowCustomer",
			type : "get",
			dataType : "json",
			data:{
				"name": name,
			},
			success : function(data) {
					handleList(data.Customer);
			}
		});
	}
	function handleList(data){
		var create_time = data.create_time.substring(0, 10);
		$('#cust_name').val(data.cust_name);
		$('#cust_type').val(data.cust_type);
		$('#cust_background').val(data.cust_background);
		$('#listed').val(data.listed);
		$('#reg_capital').val(data.reg_capital);
		$('#year_sales').val(data.year_sales);
		$('#entp_scale').val(data.entp_scale);
		$('#tester_no').val(data.tester_no);
		$('#url').val(data.url);
		$('#zip_code').val(data.zip_code);
		$('#address').val(data.address);
		$('#main_products').text(data.main_products);
		$('#major_services').text(data.major_services);
		$('#status').val(data.status);
		$('#username').val(data.username);
		$('#create_time').val(create_time);
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
        if(cust_name == ''){
        	alert("公司名称不能为空！")
        }else if(reg_capital == ''){
        	alert("注册资本不能为空！")
        }else{
        	$.ajax({
                url: "/customers/updateCustomer",
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
                },
                success: function (data) {
                	alert(data.msg);
                	window.location.href = "http://localhost:8080/customers/";
                	window.event.returnValue=false;
                }
            });
        }
    });
	function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return '';
	}
});