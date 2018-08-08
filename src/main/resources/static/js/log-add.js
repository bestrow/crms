$(document).ready(function(){
		$.getJSON("/logs/getcustname", function(data) {
			var htmlstr = "";
			$.each(data, function(infoindex, info) {
				htmlstr += "<option value=" + info + ">" + info + "</option>";
			})
			$("#cust_name").html(htmlstr);
		});
		$("#sumbit").click(function() {
			var title = $("#title").val();
			var desc = $("#desc").val();
			var cust_name = $("#cust_name").val();
			var create_time = $("#create_time").val();
			if(create_time != null) {
				create_time = new Date($("#create_time").val()
					.replace(/-/g, '/'));
			}
			$.ajax({
				url : "/logs/addlog",
				type : "get",
				dataType : "json",
				data : {
					"title" : title,
					"desc" : desc,
					"cust_name" : cust_name,
					"create_time" : create_time
				},
				success : function(data) {
					if (data.isSuccess) {
                        alert("插入成功！");
					} else {
						alert("插入失败！");
					}
				}
			})
		});
	})