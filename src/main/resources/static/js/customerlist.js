$(function() {
	getUsers();
	window.onload = function(){
        var button = document.getElementById('query');
        button.click();
    };
	function getUsers(e) {
		$.ajax({
			url : "/users/listUsers",
			type : "get",
			dataType : "json",
			success : function(data) {
					usersHandleList(data.users);
					zprList(data.users);
			}
		});
	}
	function zprList(data) {
		var html = '<option value="0" >==请选择==</option>';
		data.map(function(item, index) {
			html += '<option value="'+(parseInt(index)+1)+'">'+item.user_name+'</option>';
		});
		$('#zpr').html(html);
	}
	function usersHandleList(data) {
		var html = '';
		data.map(function(item, index) {
			html += '<option value="'+(parseInt(index)+1)+'">'+item.user_name+'</option>';
		});
		$('#edit_select_role').html(html);
	}
	function handleList(data) {
		var html = '';
		data.map(function(item, index) {
			var time = item.create_time.substring(0, 10);
			var s="";
			if(item.status === 1){
				s+="潜在"; 
			}else if(item.status === 2){
				s+="正式"; 
			}else if(item.status === 3){
				s+="放弃"; 
			}else if(item.status === 4){
				s+="签约"; 
			}
			html += '<tr class="text-c"> <td>'
					+ (parseInt(index)+1) + '</td> <td><a id="updatePage" data-name="'+item.cust_name+'">'
					+ item.cust_name + '</a></td> <td>'
					+ item.user_name + '</td> <td>'
					+ time +'</td> <td>'
					+ s + '</td> <td>'
					+ '<a id="delete" data-name="'+item.cust_name+'">删除</a>&nbsp;'
					+ '<a id="zhipai" data-name="'+item.cust_name+'">指派</a> </td>'
					+ ' </tr>';
		});
		$('#customersTable').html(html);
	}
	$('tbody').on('click', '#updatePage', function (e) {
		var cust_name = e.target.dataset.name;
		window.location.href = "http://localhost:8080/customers/update?name="+cust_name+"";
	});
	$('tbody').on('click', '#delete', function (e) {
		var cust_name = e.target.dataset.name;
		$.ajax({
            url: "/customers/deleteCustomer",
            async: false,
            cache: false,
            type: "get",
            dataType: 'json',
            data: {
                "cust_name": cust_name,
            },
            success: function (data) {
                    alert(data.msg);
                    window.location.href = "/front/customer-list";
            }
        });
		
	});
	$('tbody').on('click', '#zhipai', function (e) {
		var cust_name = e.target.dataset.name;
		var user_id;
		$('#dialog').dialog({
            resizable: false,
            height: 160,
            modal: true,
            buttons: {
                "确定": function () {
                	username = $('#edit_select_role option:selected').text();
                	$.ajax({
                        url: "/users/getUserId",
                        async: false,
                        cache: false,
                        type: "get",
                        dataType: 'json',
                        data: {
                            "user_name":username,
                        },
                        success: function (data) {
                           user_id = data.user_id;
                        }
                    });
                    $.ajax({
                        url: "/customers/updateUserId",
                        async: false,
                        cache: false,
                        type: "GET",
                        dataType: 'json',
                        data: {
                            "cust_name":cust_name,
                            "user_id":user_id,
                        },
                        success: function (data) {
                            alert(data.msg);
                            window.location.href = "/front/customer-list";
                        }
                    });
                    $(this).dialog("close");
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
	});
	$("#query").click(function () {
		  var cname = $('#cname').val();
		  var zpr = $('#zpr').val();
		  var bj = $('#bj').val();
		  var ss = $('#ss').val();
		  var leix = $('#leix').val();
		  var zt = $('#zt').val();
		  var user_id=0;
		  username = $('#zpr option:selected').text();
		  if(username != "==请选择=="){
			  $.ajax({
	              url: "/users/getUserId",
	              async: false,
	              cache: false,
	              type: "get",
	              dataType: 'json',
	              data: {
	                  "user_name":username,
	              },
	              success: function (data) {
	                 user_id = data.user_id;
	              }
	          });
		  }
		  $.ajax({
              url: "/customers/queryCustomers",
              async: false,
              cache: false,
              type: "get",
              dataType: 'json',
              data: {
                  "cname": cname,
                  "user_id": user_id,
                  "bj": bj,
                  "ss": ss,
                  "leix": leix,
                  "zt": zt,
              },
              success: function (data) {
            	  handleList(data.Customers);
              }
          });
	});
});