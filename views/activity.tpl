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
		activities = [{{!','.join([a.toHTML() for a in activities])}}];
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
		<div id='activity-left' class='activity'></div>
		<div id='timeline' onmouseover="showDate(event)" onmouseout="hideDate()" onmousemove="showDate(event)">
			<div id='start'>+</div>
			<div id='date-prompt'></div>
		</div>
		<div id='activity-right' class='activity'></div>
		<div class='clear'></div>
		
	</div>
	{{! gen.genFooter()}}
</body>
</html>
