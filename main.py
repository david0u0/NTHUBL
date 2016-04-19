# coding=UTF-8
from bottle import static_file, run, route, template, default_app, post, request, redirect
from paste import httpserver
from beaker.middleware import SessionMiddleware
import content_generator as gen
from pymongo import MongoClient
from bson.objectid import ObjectId
import projectQA_main

client = MongoClient()
client.test_database.authenticate('nthubl', 'nthubl2016', mechanism='SCRAM-SHA-1')
db = client.test_database
activity_db = db.activity
message_db = db.message

@route('/prod/<i>')  #acess through ajax
def product_detail(i):
	i = int(i)
	s = "<div id='discription'>" + template('detail_%d' % i) + "</div>"
	return gen.genDetailSlider(i) + s + "<div class='clear'></div>"

@route('<path:path>')
def static(path):
	return static_file(path, root='static')

@route('/')
@route('/home')
def index():
	global message_db
	a = message_db.find()
	msgs = [gen.Msg.initFromDict(m) for m in a]
	return template('index', gen=gen, msgs=msgs)

@route('/product')
def product():
	return template('product', gen=gen, product_gen=gen.ProductGenerator())

@route('/activity')
def activity():
	global activity_db
	a = activity_db.find()
	activities = [gen.Activity.initFromDict(ac) for ac in a]
	activities = sorted(activities, gen.Activity.compare)
	return template('activity', gen=gen, activities=activities)

@route('/about')
def about():
	return template('about', gen=gen)

@route('/index_back')
def index_back():
	global message_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	a = message_db.find()
	msgs = [gen.Msg.initFromDict(m) for m in a]
	return template('backstage/index', msgs=msgs)

@post('/index_back/<id>') 
def post_index(id):
	global message_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	title = request.forms.get('title')
	href = request.forms.get('href')
	if(id == 'new'):
		m = gen.Msg(title, href=href)
		message_db.insert_one(m.toDict())
	else:
		message_db.update_one({'_id': ObjectId(id)}, {'$set':{
			'title': title, 
			'href': href
		}})
	redirect('/index_back')

@post('/index_back_delete/<id>') 
def delete_index(id):
	global message_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	message_db.delete_one({'_id': ObjectId(id)})
	redirect('/index_back')

@route('/activity_back')
def activity_back():
	global activity_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	a = activity_db.find()
	activities = [gen.Activity.initFromDict(ac) for ac in a]
	activities = sorted(activities, gen.Activity.compare)
	return template('backstage/activity', activities=activities)

@post('/activity_back/<id>') 
def post_activity(id):
	global activity_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	month = request.forms.get('month')
	datetime = request.forms.get('date')
	[year, month, date] = [int(s) for s in datetime.split('-')]
	title = request.forms.get('title')
	href = request.forms.get('href')
	detail = request.forms.get('detail')
	detail = detail.replace("'", "\\'")
	detail = detail.replace("\r\n", "</br>")
	detail = detail.replace("\n", "</br>")
	detail = detail.replace("  ", "&nbsp;&nbsp;")
	img = request.files.get('img')
	if(id == 'new'):
		if not img:
			return "IMAGE ERROR!!"
		a = gen.Activity(title, href, detail, month, date)
		id = activity_db.insert_one(a.toDict()).inserted_id
		id = str(id)
	else:
		activity_db.update_one({'_id': ObjectId(id)}, {'$set':{
			'title': title, 
			'href': href,
			'detail': detail,
			'month': month,
			'date': date,
		}})
	if img:
		img.save('static/img/activity/' + id, overwrite=True)
	redirect('/activity_back')

@post('/activity_back_delete/<id>') 
def delete_activity(id):
	global activity_db
	if 'admin_account' not in request.session:
		redirect('/adminLogin')
	activity_db.delete_one({'_id': ObjectId(id)})
	redirect('/activity_back')

session_opts = {
    'session.type': 'file',
    'session.data_dir': './session/',
    'session.auto': True,
}
app = SessionMiddleware(default_app(), session_opts)
#run(app=app, host='0.0.0.0', port=80, debug=True)
#app = default_app()
httpserver.serve(app, host='0.0.0.0', port=80)
