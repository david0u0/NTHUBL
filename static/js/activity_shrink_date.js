var UNIT = 170;
var START = new Date("2016/5/8");

function Omissioin(a, b, omitted_days) {
	this.start = a;
	this.end = b;
	this.days = b-a;
}

function OmissioinList() {
	this.omissions = [];
	this.last_day = 0;
}
OmissioinList.prototype._push = function(a, b) {
	var o = new Omissioin(a, b, this.omitted_days);
	o.y = this.getY(a);
	this.omissions.push(o);
}
OmissioinList.prototype.pushActivityDays = function(day) {
	if(day - this.last_day > 2) {
		this._push(this.last_day + 1, day - 1);
	}
	this.last_day = day;
}
OmissioinList.prototype.getY = function(day) {
	var omitted = 0;
	for(var i = 0; i < this.omissions.length; i++) {
		var o = this.omissions[i];
		if(o.end > day) break;
		omitted += o.days;
	}
	return (day - omitted) * UNIT;
}
OmissioinList.prototype.getDay = function(y) {
	var omitted = 0;
	for(var i = 0; i < this.omissions.length; i++) {
		var o = this.omissions[i];
		if(o.y > y) break;
		omitted += o.days;
	}
	return Math.round(y/UNIT) + omitted;
}
/**************/

function dateDelta(date) {
	var t = new Date(date) - START;
	return Math.round(t/86400000);
}

