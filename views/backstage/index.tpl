<html>
<head>
	<meta charset="UTF-8">
	<title>公告後台</title>
	<script type="text/javascript">
	window.onresize = function(event) {
		handleAllCenter();
	}
	</script>
</head>
<body>
	<table>
	<tr>
	<td>月份</td>
	<td>日期</td>
	<td>標題</td>
	<td>連結</td>
	</tr>
	% for msg in msgs:
		{{!msg.toHTMLForm()}}
	% end
	<tr>
	<form method='post' action='/index_back/new'>
		<td></td>
		<td></td>
		<td><input name='title'></td>
		<td><input name='href'></td>
		<td><button> 新公告 </button></td>
	</form>
	</tr>
	</table>
</body>
</html>
