$(document).ready(function(){
		$.getJSON("/logs/getcustname", function(data) {
			var htmlstr = "";
			$.each(data, function(infoindex, info) {
				htmlstr += "<option value=" + info + ">" + info
						+ "</option>";
			})
			$("#cust_name").html(htmlstr);
		});
		(function($){
			$.getUrlParam
			 = function(name)
			{
			var reg
			 = new RegExp("(^|&)"+
			 name +"=([^&]*)(&|$)");
			var r
			 = window.location.search.substr(1).match(reg);
			if (r!=null) return unescape(r[2]); return null;
			}
		})(jQuery);//这个方法可以提取url参数
		var book_id = $.getUrlParam("book_id");
		var url = "/bookinfo/findbookinfo?" + "book_id=" + book_id;
		$.getJSON(url, function(data){
			var title = data.title;
			var desc = data.desc;
			var cust_name = data.cust_name;
			var book_time = new Date(data.book_time).toLocaleDateString();
			var create_time = new Date(data.create_time).toLocaleDateString();
			var str = create_time.split("/");
			if(str[1] <= 9)
				str[1] = "0" + str[1];
			if(str[2] <= 9)
				str[2] = "0" + str[2];
			var create_timeDateStr = str[0] + "-" + str[1] + "-" + str[2]; 
			
			var str2 = book_time.split("/");
			if(str2[1] <= 9)
				str2[1] = "0" + str2[1];
			if(str2[2] <= 9)
				str2[2] = "0" + str2[2];
			var book_timeDateStr = str2[0] + "-" + str2[1] + "-" + str2[2]; 
			$("#cust_name").val(cust_name);
			$("#title").val(title);
			$("#desc").val(desc);
			$("#book_time").val(book_timeDateStr);
			$("#create_time").val(create_timeDateStr);
		});
		$("#submit").click(
				function() {
					var book_id = $.getUrlParam("book_id");
					var title = $("#title").val();
					var desc = $("#desc").val();
					var cust_name = $("#cust_name").val();
					if(book_time != "") {
						book_time = new Date($("#book_time").val()
							.replace('-', '/')); //两种方法都可以
					}
					var create_time = $("#create_time").val();
					if(create_time != "") {
						create_time = new Date($("#create_time").val()
							.replace(/-/g, '/'));
					}
					$.ajax({
						url : "/bookinfo/editbookinfo",
						type : "get",
						dataType : 'json',
						data : {
							"book_id": book_id,
							"title" : title,
							"desc" : desc,
							"cust_name" : cust_name,
							"book_time" : book_time,
							"create_time" : create_time
						},
						success : function(data) {
							if (data.isSuccess) {
								window.location.href = "/front/bookinfo-list";
							} else {
								alert("修改失败");
							}
						}
					})
				});
	});