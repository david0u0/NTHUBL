<html>
<head>
	<title>2016</title>
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="/css/product.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<script type="text/javascript" src="/js/common.js"></script>
	<script type="text/javascript" src="/js/product.js"></script>
	<script type="text/javascript">
	window.onresize = function(event) {
		handleAllCenter();
	}
	</script>
</head>
<body onload='handleAllCenter();init();'>
	{{! gen.genHeader(1) }}
	<div id='main-img' class='disp-block'>
		<img src="img/test.jpg"/>
		<div class='discription'>
			<h1>NTHU BL</h1>
			<h2>YAA</h2>
			<h3>test test test</h3>
		</div>
	</div>
	<div id='expander'>
		<div id='detail-container'>
		</div>
	</div>
	<div id='product-container'>
		{{! product_gen.gen('''
			<h2>NTHU BL</h2>
			<h3>test</h3>
		''')}}
		{{! product_gen.gen('''
			<h2>NTHU BL</h2>
			<h3>test test</h3>
		''')}}
		{{! product_gen.gen('''
			<h2>NTHU BL</h2>
			<h3>test test test</h3>
		''')}}
		{{! product_gen.gen('''
			<h2>NTHU BL</h2>
			<h3>test test</h3>
		''')}}
		<div class='clear'></div>
	</div>
	{{! gen.genFooter()}}

</body>
</html>
