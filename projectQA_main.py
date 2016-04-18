#!/usr/bin/python
# -*- coding: utf-8 -*-
from paste import httpserver
import bottle
import beaker
import re
import json
import random
import datetime
from bottle import get, route, run, template, static_file, request, response, hook, redirect
from beaker.middleware import SessionMiddleware
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

# create a mongo client connect to default host and port
host = "localhost"
port = 27017
client = MongoClient(host,port)
client.test_database.authenticate('nthubl','nthubl2016', mechanism='SCRAM-SHA-1')
# get the database
db = client.test_database

# get collections (i.e. tables) in the database
contestants = db.contestantTable
adminTable  = db.adminTable
question_db = db.question_db
studentID_db = db.valid_student_ids

# deal with login session
#app = beaker.middleware.SessionMiddleware(bottle.app(), session_opts)
#bottle.TEMPLATE_PATH.insert(0, '/template/')

# number of questions per request
N = 6


def is_student_id_valid(test_id):
	a = studentID_db.find({'_id': test_id}, {'_id':1}).limit(1)
	return a.count()>0
def is_student_id_exist(test_id):
	a = contestants.find({'student_id': test_id}, {'_id':1}).limit(1)
	return a.count()>0
##########################################################################
# Request Initialization
##########################################################################
@hook('before_request')
def setup_request():
	# this makes "address/to/page" == "address/to/page/"
	request.environ['PATH_INFO'] = request.environ['PATH_INFO'].rstrip('/')
	# easier for dealing session
	request.session = request.environ['beaker.session']

##########################################################################
# Static Page Handling
##########################################################################
# Request for HomePage
@route('/projectQAwelnfwejfowej')
def index_page():
	return static_file('projectQA.html',root='./static_pages/')

# Request for admin Login Page
@get('/adminLogin')
def loginAdmin():
	return static_file('adminLogin.html', root='./static_pages/')

# Request for admin Page
@route('/adminPage')
def adminPage():
	if 'admin_account' in request.session:
		return static_file('adminPage.html', root='./static_pages/')
	else:
		return static_file('loginfail.html', root='./static_pages/')

# Request for Q&A Page
@route('/QA')
def QAPage():
	return static_file('Q&A.html',root='./static_pages/')

# Server Error Page
@route('/error')
def error_redir():
	return static_file('error_page.html',root='./static_pages/')

# Pass the test
@route('/pass')
def pass_redir():
	return static_file('pass.html',root='./static_pages/')

##########################################################################
# Server Functions
##########################################################################
@get('/adminLogin', method='POST')
def verifyAdminIdentity():
	global adminTable
	admin_account = request.forms.get('admin_account')
	admin_password = request.forms.get('admin_password')

	# check if name/ID acquired successfully ?
	if not admin_account or not admin_password:
		return static_file('loginfail.html', root='./static_pages/')

	adminInfo = adminTable.find_one({"account":admin_account})

	if not adminInfo:
		return static_file('loginfail.html', root='./static_pages/')

	if adminInfo['password'] != admin_password:
		return static_file('loginfail.html', root='./static_pages/')

	# Login Success, create session & Redirecting
	request.session['admin_account'] = admin_account;
	redirect("/adminPage")

@route('/adminPage_test')
def adminPage_test():

	# check the identity here, and return a admin page (should include a logout button) ### TODO ###
	if 'admin_account' in request.session:
		return "Login successfully!! Hello " + request.session['admin_account'] + """</br>
			well this is a multiple line <br/>
			let's see what it can do <br/> 
			maybe a button here to logout!!  <br/>
			<button onClick="window.location.href = './adminLogout'">Logout</button>
			"""
	else:
		return static_file('loginfail.html', root='./static_pages/')

@route('/adminLogout')
def logoutAdmin():
	request.session.delete()
	redirect("/adminLogin")

@route('/InsertContestantData', method='POST')
def insertNewContestant():
	global contestants
	# get data from post form
	name = request.forms.get('name')
	studentID = request.forms.get('studentID')

	# check if name/ID acquired successfully ? 
	if not name or not studentID:
		return static_file('InsufficientData.html', root='./static_pages/')

	# studentID should be all number [0-9]+
	pattern = re.compile("[0-9]+")
	valid = pattern.match(studentID)
	if valid is None:
		return static_file('InvalidID.html', root='./static_pages/')
	
	# check if student ID is already in the database?
	exist = contestants.find_one({"studentID":studentID})
	if exist is not None:
		return static_file('IDAlreadyExist.html', root='./static_pages/')

	post = {"name":name, "studentID":studentID}
	insertedID = contestants.insert_one(post).inserted_id
	return "insert complete!!" + str(insertedID)

# Add a new question
@route('/addQuestion', method='POST')
def add():
	question = request.forms.get('question')
	A = request.forms.get('optionA')
	B = request.forms.get('optionB')
	C = request.forms.get('optionC')
	D = request.forms.get('optionD')
	answer = request.forms.get('answer')

	post = {"question": question,
			"optionA": A,
			"optionB": B,
			"optionC": C,
			"optionD": D,
			"answer": answer}
	
	post_id = question_db.insert_one(post).inserted_id
	redirect("/adminPage")

# Delete a question from db based on ObjectId
@route('/deleteQuestion', method='POST')
def deleteQuestion():
	qid = request.forms.get('objid')
	dpost = {"_id":ObjectId(qid)}
	result = question_db.delete_one(dpost)
	redirect("/adminPage")
##########################################################################
# Resource Handling
##########################################################################
# Request for javascript files


# Get all the questions inside database
@route('/getAllQuestions')
def getAllQuestions():
	if 'admin_account' in request.session:
		global question_db
		questions = []
		questionCursor = question_db.find({})
		for q in questionCursor:
			q["_id"] = str(q["_id"])
			questions.append(q)
		responseObj = dict(data=questions)
		response.content_type = "application/json"
		return json.dumps(responseObj)

@route('/requestQuestionSet')
def requestQuestionSet():
	random.seed(datetime.now())
	total_questions = question_db.count()
	if N>total_questions:
		return
	questions = []
	id_set = random.sample(xrange(0,total_questions), N)
	for i in id_set:
		r = question_db.find().limit(-1).skip(i).next()
		del r["answer"]
		r["_id"] = str(r["_id"])
		questions.append(r)
	responseObj = dict(data=questions)
	response.content_type = "application/json"
	response.set_header("Cache-Control","no-cache")
	response.add_header("Cache-Control","no-store")
	response.add_header("Cache-Control","must-revalidate")
	response.set_header("Pragma","no-cache")
	response.set_header("Expires", "0")
	return json.dumps(responseObj)

# error code =
# 0:answer correct
# 1:answer wrong
# -1:server error
@route('/evalAnswer', method='POST')
def evalAnswer():
	error_code = 0
	table_data = []
	data = request.json['dict']
	sizeN = request.json['N']
	
	client_ip = request.environ.get('REMOTE_ADDR')
	student_id = request.json['student_id']
	student_name =  request.json['student_name']
	student_ph =  request.json['student_ph']

	# if size doesn't match, report error
	if len(data) != N:
		return "<script>window.location='/error'</script>"

	for i in range(N):
		# if data doesn't exist, report error
		if data[i] is None:
			return "<script>window.location='/error'</script>"

		objid = data[i]["id"]
		usrans = data[i]['ans']

		# if data is not valid, report error
		if (objid is None) or (not objid) or (usrans is None) or (not usrans):
			return "<script>window.location='/error'</script>"

		cur = question_db.find({"_id":ObjectId(objid)})

		# if data is not valid, report error
		if cur.count() != 1:
			return "<script>window.location='/error'</script>"

		if cur[0]['answer'] != usrans:
			error_code = 1
			table_data.append({"qid":i,
							   "q_body":cur[0]["question"],
							   "A":cur[0]["optionA"],
							   "B":cur[0]["optionB"],
							   "C":cur[0]["optionC"],
							   "D":cur[0]["optionD"],
							   "YA":data[i]['ans'],
							   "TA":cur[0]['answer']
							   })
		else:
			table_data.append({"qid":i,
							   "q_body":cur[0]["question"],
							   "A":cur[0]["optionA"],
							   "B":cur[0]["optionB"],
							   "C":cur[0]["optionC"],
							   "D":cur[0]["optionD"],
							   "YA":data[i]['ans'],
							   "TA":cur[0]['answer']
							   })


	if error_code==0:
		# Answer correct, check if student ID valid ?
		if not is_student_id_valid(student_id):
			return "<script>alert('此學號:"+str(student_id)+" 不存在!');window.location='/QA'</script>"
		if is_student_id_exist(student_id):
			return "<script>alert('此學號"+str(student_id)+" 已存在於資料庫中!!');window.location='/pass'</script>"
		post = {"student_id":student_id,
				"student_name":student_name,
				"student_ph":student_ph,
				"client_ip":client_ip,
				"date":datetime.now()}
		contestants.insert_one(post)
		return "<script>alert('恭喜您!正確答案!現在跳轉至查詢處!');window.location='/pass';</script>"
	else:
		return template('error_board',table_data=table_data)

@route('/checkIdExist', method='POST')
def checkIdExist():
	query_id = request.json['query_id']
	doc = contestants.find_one({'student_id':query_id})
	if doc is None:
		responseObj = dict(exist=0)
	else:
		responseObj = dict(exist=1, date_in=doc['date'].strftime("%Y-%m-%d %H:%M:%S"))
	return json.dumps(responseObj)

@route('/getAllContestants')
def getAllContestants():
	if 'admin_account' in request.session:
		contest = []
		contestantCursor = contestants.find({})
		for c in contestantCursor:
			del c["_id"]
			c["date"] = str(c["date"])
			contest.append(c)
		responseObj = dict(data=contest)
		response.content_type = "application/json"
		return json.dumps(responseObj)
#run(app=app, host='0.0.0.0', port=80, debug=True)
#run(app=app, host='0.0.0.0', port=80, debug=False)
#httpserver.serve(app, host='0.0.0.0', port=80)

