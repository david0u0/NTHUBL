# coding=UTF-8
from bottle import static_file, run, route, template, default_app
from paste import httpserver
from beaker.middleware import SessionMiddleware
import content_generator as gen
#import projectQA_main

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
	msgs = [gen.Msg("test", msg="123"), gen.Msg("haha")]
	return template('index', gen=gen, msgs=msgs)

@route('/product')
def product():
	return template('product', gen=gen, product_gen=gen.ProductGenerator())

@route('/activity')
def activity():
	return template('activity', gen=gen)

@route('/about')
def about():
	return template('about', gen=gen)


session_opts = {
    'session.type': 'file',
    'session.data_dir': './session/',
    'session.auto': True,
}
app = SessionMiddleware(default_app(), session_opts)
#run(app=app, host='0.0.0.0', port=80, debug=True)
#app = default_app()
httpserver.serve(app, host='0.0.0.0', port=80)
