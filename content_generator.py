# coding=UTF-8
from datetime import date
def genHeader(n):
	a = [('home', '首頁'), ('product', '商品'),
	('activity', '活動'), ('about', '關於我們')]
	for i in range(0, len(a)):
		if(i == n):
			a[i] = "<a href='/%s'><div class='nav selected'>%s</div></a>" % a[i]
		else:
			a[i] =  "<a href='/%s'><div class='nav'>%s</div></a>" % a[i]
	s = " ".join(a)
	return "<div id='header'>" + s + "<div id='header-icon'>2016清華大學畢業季</div> </div>"

def genFooter():
	s = '''
	<div id="footer">
	    <div id="footer-content">
	        <table align="center" border="0" cellspacing="0" cellpadding="0">
	            <tr>
	                <td width="150"><img src="img/logo-small.png" height="113" width="100"></td>
	                <td width="250">
	                    <p style='font-size:16px'>國立清華大學畢業生聯誼會</p>
	                    <p id="english-name">National Tsing Hua University<br /> Graduation Student Association </p>
	                </td>
	                <td width="100"></td>
	                <td width="100"><a href="/about"><i class="fa fa-graduation-cap fa-2x"></i></a><br /> <p>About Us</p></td>
	                <td width="180"><a href="https://www.facebook.com/nthugrad/"><i class="fa fa-facebook-square fa-2x"></i></a> <br /><p>Facebook粉絲專頁</p></td>
	                <td width="220"><i class="fa fa-map-marker fa-2x"></i><br /> <p>30013新竹市光復路二段101號</p></td>
	                <td width="200"><i class="fa fa-envelope fa-2x"></i><br /> <p>nthugrad@gmail.com</p></td>
	            </tr>
	        </table>
	    </div>
	</div>
	'''
	return s

class ProductGenerator:
	def __init__(self):
		self.i = 0
	def gen(self, i, discription):
		s = '''
			<div class='disp-block product' onclick='displayDetail(%d)'>
				<img src='img/pro/pro%d.jpg'/>
				<div class='shadow'>
					<div class='discription'>
						%s
					</div>
				</div>
			</div>
		'''
		s = s % (i, i, discription)
		return s


def genDetailSlider(i):
	counts = [4, 3, 3, 3, 3, 4]
	s = '<div id="slicker">'
	for j in range(0, counts[i]):
		s += '<img src="/img/detail/detail%d_%d.jpg" />' % (i, j)
	s += '</div>'
	return s

class Msg:
	def __init__(self, title, msg=None, href=None):
		self.title = title
		self.msg = msg
		self.href = href
		self.date = str(date.today())
	def toHTML(self):
		s = ''
		if self.href:
			s = '''
			<a href="%s">
			<span class="time">%s</span> 
			%s
			</a>
			''' %(self.href, self.date, self.title)
		else:
			s = '''
			<a>
			<span class="time">%s</span> 
			%s
			</a>
			''' %(self.date, self.title)
			#if self.msg:
			#	s += "<div class='msg'>%s</div>" % self.msg
		return s

	def toDict(self):
		return self.__dict__
