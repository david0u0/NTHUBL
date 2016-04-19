<html>
<head>
	<title>商品介紹</title>
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="/css/product.css">
	<link rel="stylesheet" type="text/css" href="/css/kart.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="/slick/slick.css"/>
	<link rel="stylesheet" type="text/css" href="/slick/slick-theme.css"/>

	<script type="text/javascript" src='/js/jquery-1.12.0.min.js'></script>
	<script type="text/javascript" src="/slick/slick.min.js"></script>

	<script type="text/javascript" src="/js/common.js"></script>
	<script type="text/javascript" src="/js/product.js"></script>
	<script type="text/javascript" src="/js/kart.js"></script>
	<script type="text/javascript">
	window.onresize = function(event) {
		handleAllCenter();
	}
	</script>
</head>
<body onload='handleAllCenter();init();'>
	{{! gen.genHeader(1) }}


	<div id='main-img' class='disp-block'>
		<img src="img/banner/product_banner.jpg"/>
		<div class='discription'>
		</div>
	</div>
	<div id='expander'>
		<div id='detail-container'>
		</div>
	</div>
	<div id='product-container'>
		<div class='clear'> </div>
		{{! product_gen.gen(0, '''
			<h2>大學T</h2>
			<h3>NTHU</h3>
		''')}}
		{{! product_gen.gen(5, '''
			<h2>領帶</h2>
			<h3>NTHU</h3>
		''')}}
		{{! product_gen.gen(4, '''
			<h2>領巾</h2>
			<h3>NTHU</h3>
		''')}}
		{{! product_gen.gen(2, '''
			<h2>畢業帽</h2>
			<h3>NTHU</h3>
		''')}}
		{{! product_gen.gen(1, '''
			<h2>證書夾</h2>
			<h3>NTHU</h3>
		''')}}
		{{! product_gen.gen(3, '''
			<h2>USB</h2>
			<h3>NTHU</h3>
		''')}}
		<div class='clear'></div>
	</div>
	{{! gen.genFooter()}}

	<div id='buy' class='buy fa fa-cart-arrow-down fa-5x' onclick="return clickBuy()"> 
		<div id='buy-prompt'>
			<a href='/about'><p>購買大學T</p></a>
			<a href='/'><p>購買其它商品</p></a>
		</div>
	</div>


</body>
</html>
