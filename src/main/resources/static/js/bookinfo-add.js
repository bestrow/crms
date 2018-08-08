$(document).ready(
			function() {
				$.getJSON("/logs/getcustname", function(data) {
					var htmlstr = "";
					$.each(data, function(infoindex, info) {
						htmlstr += "<option value=" + info + ">" + info
								+ "</option>";
					})
					$("#cust_name").html(htmlstr);
				});
				$("#submit").click(
						function() {
							var url = "/bookinfo/addbookinfo";
							var title = $("#title").val();
							var desc = $("#desc").val();
							var cust_name = $("#cust_name").val();
							if(book_time != null) {
								book_time = new Date($("#book_time").val()
									.replace('-', '/')); //两种方法都可以
							}
							var create_time = $("#create_time").val();
							if(create_time != null) {
								create_time = new Date($("#create_time").val()
									.replace(/-/g, '/'));
							}
							$.ajax({
								url : url,
								type : "get",
								dataType : 'json',
								data : {
									"title" : title,
									"desc" : desc,
									"cust_name" : cust_name,
									"book_time" : book_time,
									"create_time" : create_time
								},
								success : function(data) {
									if (data.isSuccess) {
										alert("插入成功!")
									} else {
										alert("插入失败!");
									}
								}
							})
						});
				$("#reset").click(function() {
					$("#desc").val().clear();
					$("#cust_name").val.claear();
					$("#book_time").val.claear();
					$("#create_time").val.claear();
				});
			});