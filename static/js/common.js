function handleCenter(block) {
	var img = block.getElementsByTagName('img')[0];
	var iw = img.offsetWidth, ih = img.offsetHeight;
	var dis = block.getElementsByClassName('discription')[0];
	var dw = dis.offsetWidth, dh = dis.offsetHeight;

	block.style.height = ih;

	dis.style.top = (ih-dh) / 2;
	dis.style.left = (iw-dw) / 2;
	
	//block.style.width = iw;

	var a = block.getElementsByClassName('shadow');
	if(a.length == 1) {
		var shadow = a[0];
		shadow.style.height = ih;
		shadow.style.width = iw;
	}
	img.style.opacity = 1;
	dis.style.display = "block";
}

function handleAllCenter() {
	var a = document.getElementsByClassName('disp-block');
	for(var i = 0; i < a.length; i++)
		handleCenter(a[i]);
	for(var i = 0; i < a.length; i++)
		handleCenter(a[i]);
	for(var i = 1; i < a.length; i++)
		handleCenter(a[i]);
	for(var i = 1; i < a.length; i++)
		handleCenter(a[i]);

	for(var i = 1; i < a.length; i++) 
		a[i].style.opacity = 1;
	a[0].style.opacity = 1;
	a[0].style.marginTop = 0;
}
