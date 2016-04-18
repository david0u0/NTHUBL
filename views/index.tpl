<html>
<head>
	<meta charset="UTF-8">
	<title>清華大學2016畢業季</title>
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="/css/index.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<script type="text/javascript" src="/js/common.js"></script>
	<script type="text/javascript">
	window.onresize = function(event) {
		handleAllCenter();
	}
	</script>
</head>
<body onload='handleAllCenter()'>
	{{! gen.genHeader(0) }}
	<div id='main-img' class='disp-block'>
		<img src="img/banner/index_banner.jpg"/>
		<div class='discription'>
		</div>
	</div>
	<div id='board'>

	<div id="news_title">
	最新公告
	</div>
	% for msg in msgs:
		{{!msg.toHTML()}}
	% end
	</div>
	{{! gen.genFooter()}}
</body>
</html>
