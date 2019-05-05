$(document).ready(function() {
	// 点击删除
	$(".remove").each(function(index) {
		$(".remove").eq(index).hover(function() {
			$(".remove").eq(index).attr("src", "/images/rabsh.svg")
		}, function() {
			$(".remove").eq(index).attr("src", "/images/rabsh-one.svg")
		})
		$(".remove").eq(index).click(function() {
			//$.trim是去除内容首末尾的空格和制表符等
			let datas = $.trim($(this).parent().parent().text())
			$.ajax({
				type: "DELETE",
				url: "/index/" + datas,
				dataType: "json",
				success: function(data) {
					// 请求成功后刷新页面
					console.log(data)
					location.reload()
				}
			});
		})

	})
	// 点击确认
	$(".add").each(function(index) {
		$(".add").eq(index).hover(function() {
			$(".add").eq(index).attr("src", "/images/add.svg")
		}, function() {
			$(".add").eq(index).attr("src", "/images/add-one.svg")
		})
		$(".add").eq(index).click(function() {
			console.log(index)
		})
	})
	// 点击input添加按钮
	$(".input-btn-img").click(function() {
		var val = $('.add-input');
		var data = {
			item: val.val()
		};
		// 判断获取的值是否为空
		if (data.item == '') {
			alert('内容不能为空,请重新输入!');
			return;
		}
		$.ajax({
			type: "POST",
			url: "/index",
			data: data,
			dataType: "json",
			success: function(response) {
				window.history.go(0)
			}
		})
	})
})
