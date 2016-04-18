var UNIT = 50;
var START = new Date("2016/5/1");

function getPos(ev) {
	var y = 0, obj = $('#timeline')[0];
	if (obj.offsetParent) {
		do {
			y += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return ev.pageY-y;
}

function showDate(ev) {
	var y = getPos(ev);
	var pr = $('#date-prompt');
	var date = new Date(START);
	date.setDate(date.getDate() + parseInt(y/UNIT));
	pr.html(dateToStr(date));
	pr.css({
		"opacity": 1.0,
		"top": y
	});
}

function hideDate() {
	$('#date-prompt').css({
		"opacity": 0.0
	});
}

function dateToStr(date) {
	return date.getMonth()+1 + '/' + date.getDate()
}

function dateDelta(date) {
	var t = new Date(date) - START;
	return Math.round(t/86400000);
}

$(document).ready(function() {
	for(var i = 0; i < activities.length; i++) {
		var date = dateDelta(activities[i].date);
		var y = date * UNIT;
		var ball = $("<div class='ball'></div>");
		if(i % 2 == 0) ball.html("←");
		else ball.html("→ ");
		ball.css({
			"top": y
		});
		$("#timeline").append(ball);

		var a = $("<a href='"+activities[i].href+"'></a>")
		var poster = $("<div class='poster'></div>");
		poster.css({
			top: y - 30
		});
		var img = $("<img src='"+activities[i].img+"'/>");
		var disc = $("<div class='disc'><h4>"+activities[i].title+"</h4>"+
			"<h5>"+activities[i].date+"</h5>"+activities[i].detail+"</div>")
		var line = $("<div class='line'></div>");
		line.css({
			top: y + 10
		});

		poster.append(img);
		poster.append(disc);
		a.append(poster);
		if(i % 2 == 0){
			$("#activity-left").append(a);
			$("#activity-left").append(line);
		}
		else {
			$("#activity-right").append(a);
			$("#activity-right").append(line);
		}
	}
});
