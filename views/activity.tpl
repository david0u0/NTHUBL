<html>
<head>
	<meta charset="UTF-8">
	<title>活動日程</title>
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="css/activity.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="/css/act_kart.css">

	<script type="text/javascript" src='js/jquery-1.12.0.min.js'></script>
	<script type="text/javascript" src='js/activity_shrink_date.js'></script>
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
			<a class='buy-a' href='https://docs.google.com/forms/d/1iQxr3bgmsXLUZ8rUk7rqKBmZBFx5zwWdwm8UXhOLHkE/viewform?entry.2082302956=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.1445912143&entry.987190267=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.965206557&entry.1507658305=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.306423058&entry.1073193715=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.1860342297&entry.1163874026=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.1072069770&entry.1875276295=0&entry.2126567045&entry.1626966561=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.1533177846&entry.1319940715=0&entry.1832508294&entry.1229789758=%E6%B2%92%E6%9C%89%E8%A6%81%E5%A0%B1%E5%90%8D%E6%AD%A4%E6%B4%BB%E5%8B%95&entry.20928723&entry.905487548&entry.437531835&entry.1886229743&entry.1292730184'>
	<div id='buy' class='buy fa fa-cart-arrow-down fa-5x'> 
		<div id='buy-prompt'>
			<p>報名活動</p>
		</div>
	</div>
	</a>
	{{! gen.genFooter()}}
</body>
</html>
