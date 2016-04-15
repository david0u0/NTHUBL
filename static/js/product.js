var detail_open = false;
var expander, detail;
var cur_index = -1;

function init() {
	expander = document.getElementById('expander');
	detail = document.getElementById('detail-container');
}

function displayDetail(index) {
	if(index == cur_index) {
		document.getElementById('main-img').scrollIntoView();
		return;
	}
	cur_index = index;
	if(detail_open == false) 
		detail_open = true;
	else {
		// If detail is open, bring the opacity down immediately.
		expander.style.transition = "none";
		expander.style.opacity = 0;
		getComputedStyle(expander).opacity;
		expander.style.transition = "opacity .5s ease-in";

	}

	var req = new window.XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				detail.innerHTML = req.responseText;
				expander.style.opacity = 1;
				expand(expander, detail.offsetHeight+30);
			}
			else { //error!

			}
		}
	}
	req.open('GET', 'prod/'+index, true);
	req.send('');
}

function expand(expander, height) {
	var h = expander.offsetHeight;
	if(Math.abs(h - height) < 20) {
		//document.getElementById('main-img').scrollIntoView();
		return;
	}
	if(h < height) expander.style.height = h + 15;
	else expander.style.height = h - 15;
	setTimeout(function() {expand(expander, height);}, 15);
}
