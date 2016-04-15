# coding=UTF-8
from bottle import static_file, run, route, template, default_app
from paste import httpserver
from beaker.middleware import SessionMiddleware
import content_generator as gen
import projectQA_main

@route('/prod/<i>')  #acess through ajax
def product_detail(i):
	return gen.genDetailHTML(i)

@route('<path:path>')
def static(path):
	return static_file(path, root='static')

@route('/')
@route('/home')
def index():
	return template('index', gen=gen)

@route('/product')
def product():
	return template('product', gen=gen, product_gen=gen.ProductGenerator())

@route('/activity')
def activity():
	return template('activity', gen=gen)

@route('/about')
def about():
	return template('about', gen=gen)

app = SessionMiddleware(default_app(), projectQA_main.session_opts)
#run(app=app, host='0.0.0.0', port=80, debug=True)
#app = default_app()
httpserver.serve(app, host='0.0.0.0', port=80)
