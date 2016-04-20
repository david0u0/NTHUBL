var omissions = new OmissioinList();
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
	date.setDate(date.getDate() + omissions.getDay(y));
	pr.html(dateToStr(date));
	pr.css({
		"opacity": 1.0,
		"top": y-20
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


$(document).ready(function() {
	for(var i = 0; i < activities.length; i++) {
		var day = dateDelta(activities[i].date);
		omissions.pushActivityDays(day);
		var y = omissions.getY(day);
		var ball = $("<div class='ball'></div>");
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
			activities[i].detail+"</div>")
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
	drawOmisions();
});

function drawOmisions() {
	var os = omissions.omissions;
	for(var i = 0; i < os.length; i++) {
		var o = os[i];
		var sign = $("<div class='sign'></div>");
		sign.css({
			"top": o.y
		});
		$("#timeline").append(sign);
	}
}
