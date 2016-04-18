<html>
<head>
	<meta charset="UTF-8">
	<title>活動日程</title>
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="css/activity.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">

	<script type="text/javascript" src='js/jquery-1.12.0.min.js'></script>
	<script type="text/javascript" src='js/activity.js'></script>
	<script type="text/javascript" src='js/common.js'></script>
	<script type="text/javascript">
		var today = 10;
	</script>
	
</head>
<body onload='handleAllCenter()'>
	{{! gen.genHeader(2) }}
	<div id='main-img' class='disp-block'>
		<img src="img/banner/activity_banner.jpg"/>
		<div class='discription'>
		</div>
	</div>
	<div id='container'>
		<div id='timeline'></div>
		<div id='ball-container'>
			<div data-title='畢業囉' data-date='2' data-duration='3' class='pass'>test test test哈哈哈</div>
			<div data-title='畢業囉2' data-date='7' data-duration='13'>test test test <a href='http://google.com'>123</a></div>
			<div data-title="o'_'o" data-date='8' data-duration='6'>
				test test test<br/>
				<img src="img/Cover.jpg" width='150px'>
			</div>
			<div data-title='畢業舞會YA' data-date='11' data-duration='9'>test test test哈哈哈</div>
		</div>
		<div class='clear'></div>
	</div>
	{{! gen.genFooter()}}
</body>
</html>
