# coding=UTF-8
def genHeader(n):
	a = [('home', '首頁'), ('product', '商品'),
	('activity', '活動'), ('about', '關於我們')]
	for i in range(0, len(a)):
		if(i == n):
			a[i] = "<a href='/%s'><div class='selected'>%s</div></a>" % a[i]
		else:
			a[i] =  "<a href='/%s'><div>%s</div></a>" % a[i]
	s = " ".join(a)
	return "<div id='header'>" + s + "</div>"

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
	                <td width="100"><i class="fa fa-graduation-cap fa-2x"></i><br /> <p>About Us</p></td>
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
	def gen(self, discription):
		s = '''
			<div class='disp-block product' onclick='displayDetail(%d)'>
				<img src='img/pro%d.jpg'/>
				<div class='shadow'>
					<div class='discription'>
						%s
					</div>
				</div>
			</div>
		'''
		s = s % (self.i, self.i, discription)
		self.i += 1
		return s

def genDetailHTML(i):
	s = '''
	 <table id="description" align="center" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td width="400"><img src="img/size.jpg" height="300" width="400"></td>
            <td width="400">
                <font size="6">
                    領帶<br /><br />
                </font>
                <font size="3">
                    yayayayaya<br />
                    yayayayayayayayayayaya<br />
                    yayaya<br /><br />
                    材質 : xxxxxxx<br />
                    尺寸 : 10x10x10 cm<br />
                    價格 : 300元<br /><br />
                </font>
            </td>

            <td width="100">
                <i class="fa fa-thumbs-up fa-2x" id="thumb"></i><br />
                <p id="thumb-text">按讚</p>
                <br /><br />

                <i class="fa fa-share-square-o fa-2x" id="share"></i><br />
                <p id="share-text">分享</p>
                <br /><br />

                <a href="https://www.facebook.com/nthugrad"><i class="fa fa-cart-arrow-down fa-2x" id="buy"></i></a><br />
                <p id="buy-text">購買連結</p>
                <br />

            </td>
        </tr>
    </table>

'''
	return s