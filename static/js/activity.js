COLOR = ['red', 'blue', 'yellow', 'green'];
STEP = 22;
activities = [];
details = [];
open = [];
timer = null;

$(document).ready(function() {
	var container = $('#ball-container');
	var a = container.children('div');
	for(var i = a.length-1; i >= 0; i--) {
		var p = $(a[i]);
		var title = p.data('title'), date = parseInt(p.data('date')), duration = parseInt(p.data('duration'));
		var div = $('<div>', {
			'class': 'ball',
			'data-num': activities.length,
			'data-duration': duration
		});
		var color = COLOR[i%COLOR.length];
		if(p.hasClass('pass')) color = 'gray';
		div.css({
			"background-color": color,
			"top": date*STEP
		});
		$("<div class='title'>"+title+"</div>").appendTo(div);
		var detail = $('<div>', {
			'class': 'detail'
		});
		detail.css('top', date*STEP + STEP);
		detail.html(p.html());
		p.remove();
		detail.appendTo(container);
		div.appendTo(container);
		div.click(clickBall);

		activities.push(div);
		details.push(detail);
		open.push(false);
	}
});

function clickBall() {
	var num = parseInt($(this).data('num'));
	if(open[num] == false) {
		for(var i = 0; i < activities.length; i++) {
			var tar = activities[i];
			if(i == num) {
				tar.removeClass('inactive');
				tar.addClass('open');
				details[i].css({'opacity': 1});
				clearTimeout(timer);
				expand(i, parseInt(tar.data('duration')) * STEP);
			}
			else {
				tar.removeClass('open');
				tar.addClass('inactive');
				tar.off('click');
			}
		}
	}
	else {
		for(var i = 0; i < activities.length; i++) {
			var tar = activities[i];
			if(i == num) {
				tar.removeClass('open');
				details[i].css({'opacity': 0});
				clearTimeout(timer);
				shrink(i);
			}
			else {
				tar.removeClass('inactive');
				tar.click(clickBall);
			}
		}
	}
	open[num] = !open[num];
}

function expand(i, h) {
	var div = activities[i];
	var cur_h = parseInt(div.height());
	if(cur_h < h) {
		div.height(cur_h+STEP);
		timer = setTimeout('expand('+i+','+h+')', 15);
	}
}

function shrink(i) {
	var div = activities[i];
	var cur_h = parseInt(div.height());
	if(cur_h > 15) {
		div.height(cur_h-STEP);
		timer = setTimeout('shrink('+i+')', 15);
	}
}