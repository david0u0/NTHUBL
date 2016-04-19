var clicked = false;
function clickBuy(len) {
	if(!len) len = 110;
	if(clicked == false) expandBuy(len);
	else closeBuy();

	clicked = !clicked;
	return !clicked;
}

function expandBuy(len) {
	$('#buy-prompt').css({
		"opacity": 1.0,
		"right": len
	});
}

function closeBuy() {
	$('#buy-prompt').css({
		"opacity": 0.0,
		"right": 0,
	});
}
