<html>
<head>
	<meta charset="UTF-8">
	<title>活動後台 </title>
	<style>
	textarea {
		width: 100px;
	}
	</style>
	<script type="text/javascript" src='js/jquery-1.12.0.min.js'></script>
	<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>

	<style>
	input[type=file] {
		display: none;
	}
	img {
		width: 80px;
		cursor: pointer;
	}
	textarea {
		width: 200px;
		height: 100px;
	}
	</style>

	<script>
	$(document).ready(function(){
		var a = $('input[type=date]');
		for(var i = 0; i < a.length-1; i++) {
			var input = $(a[i]);
			a[i].defaultValue = $(a[i]).data('date');
		}
	});
	function upload(id) {
		var input = $('#upload-'+id);
		input.click();
		(function(id) {
		input.change(function() {
			if(this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					$('#img-'+id).attr('src', e.target.result);
				}
				reader.readAsDataURL(this.files[0]);
			}
		})
		})(id);
	}
	</script>
</head>
<body>
	<table>
	<tr>
	<td>日期</td>
	<td>標題</td>
	<td>連結</td>
	<td>介紹</td>
	<td>圖片</td>
	</tr>
	% for a in activities:
		{{!a.toHTMLForm()}}
	% end
	<tr>
	<form method='post' action='/activity_back/new' enctype="multipart/form-data">
		<td><input type='date' name='date'></td>
		<td><input name='title'></td>
		<td><input name='href'></td>
		<td><textarea name='detail'></textarea></td>
		<td><img id='img-new' src='img/Huamei.png' onclick='upload("new")' /></td>
		<input id='upload-new' type="file" name="img"/>
		<td><button> 新活動 </button></td>
	</form>
	</table>
</body>
</html>
