$(document).ready(function(){
	$.getJSON("/logs/getlogs", function(data){
		htmlStr = "<thead><tr class=&quot;text-c&quot;><th width=&quot;50&quot;>编号</th>" +
		"<th width=&quot;150&quot;>客户名称</th><th width=&quot;50&quot;>标题</th>" + 
		"<th width=&quot;50&quot;>明细</th><th width=&quot;50&quot;>创建日期</th>" + 
		"<th width=&quot;50&quot;>操作</th></tr></thead>";
		$.each(data, function(infoindex, info){
			var create_time = new Date(info["create_time"]).toLocaleDateString();
			htmlStr += "<tbody><tr class=&quot;text-c&quot;>";
			htmlStr += "<td>" + (infoindex + 1) + "</td>";
			htmlStr += "<td><a href=" + "/front/log-update?log_id=" + info["log_id"] + ">" + info["cust_name"] + "</a></td>";
			htmlStr += "<td>" + info["title"] + "</td>";
			htmlStr += "<td>" + info["desc"] + "</td>";
			htmlStr += "<td>" + create_time + "</td>";
			htmlStr += "<td><a onclick=&quot;del()&quot; href=" + "/logs/dellog?log_id=" + info["log_id"] + ">删除</a></td>";
			htmlStr += "</tr></tbody>"
		})
		$("#table").html(htmlStr);
	});
	$("#find").click(function(){
		var cust_name = $("#cust_name").val();
		if(cust_name == ""){
			$.getJSON("/logs/getlogs", function(data){
				htmlStr = "<thead><tr class=&quot;text-c&quot;><th width=&quot;50&quot;>编号</th>" +
				"<th width=&quot;150&quot;>客户名称</th><th width=&quot;50&quot;>标题</th>" + 
				"<th width=&quot;50&quot;>明细</th><th width=&quot;50&quot;>创建日期</th>" + 
				"<th width=&quot;50&quot;>操作</th></tr></thead>";
				$.each(data, function(infoindex, info){
					var create_time = new Date(info["create_time"]).toLocaleDateString();
					htmlStr += "<tbody><tr class=&quot;text-c&quot;>";
					htmlStr += "<td>" + (infoindex + 1) + "</td>";
					htmlStr += "<td><a href=" + "/front/log-update?log_id=" + info["log_id"] + ">" + info["cust_name"] + "</a></td>";
					htmlStr += "<td>" + info["title"] + "</td>";
					htmlStr += "<td>" + info["desc"] + "</td>";
					htmlStr += "<td>" + create_time + "</td>";
					htmlStr += "<td><a onclick=&quot;del()&quot; href=" + "/logs/dellog?log_id=" + info["log_id"] + ">删除</a></td>";
					htmlStr += "</tr></tbody>"
				})
				$("#table").html(htmlStr);
			});
		}
		else {
			var url = "/logs/getlogbycustname" + "?cust_name=" + cust_name;
			$.getJSON(url, function(data) {
				$("#table").empty();
				htmlStr = "<thead><tr class=&quot;text-c&quot;><th width=&quot;50&quot;>编号</th>" +
				"<th width=&quot;150&quot;>客户名称</th><th width=&quot;50&quot;>标题</th>" + 
				"<th width=&quot;50&quot;>明细</th><th width=&quot;50&quot;>创建日期</th>" + 
				"<th width=&quot;50&quot;>操作</th></tr></thead>";
				$.each(data, function(infoindex, info){
					var create_time = new Date(info["create_time"]).toLocaleDateString();
					htmlStr += "<tbody><tr class=&quot;text-c&quot;>";
					htmlStr += "<td>" + (infoindex + 1) + "</td>";
					htmlStr += "<td><a href=" + "/front/log-update?log_id=" + info["log_id"] + ">" + info["cust_name"] + "</a></td>";
					htmlStr += "<td>" + info["title"] + "</td>";
					htmlStr += "<td>" + info["desc"] + "</td>";
					htmlStr += "<td>" + create_time + "</td>";
					htmlStr += "<td><a onclick=&quot;del()&quot; href=" + "/logs/dellog?log_id=" + info["log_id"] + ">删除</a></td>";
					htmlStr += "</tr></tbody>"
				})
				$("#table").html(htmlStr);
			});
		}
	});
})