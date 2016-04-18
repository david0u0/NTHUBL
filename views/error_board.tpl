<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>糟糕! 有些答案錯囉!</title>
  <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <style>
  body{
    font-family: 'Source Sans Pro', '微軟正黑體', sans-serif;
    background-image: url('/img/transparent.jpg');
  }
  .demo-block {
    width: 700px;
    padding-top: 10px;
    margin:10px;
    background-color: #FFFFFF;
    border-style: groove;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    }    

    .qmain {
        width: 97%;
        padding: 10px;
        margin-bottom: 15px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        margin-left: auto;
        margin-right: auto;
    }    

    .qmain>p{
      font-size: 20pt;
      font-weight: bold;
      line-height: 125%;
    }
  </style>
</head>


<body>

	<nav class="navbar navbar-inverse navbar-fixed-top" style="background-color:#660066">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/projectQA" style="color:#ffffff"><i class="fa fa-graduation-cap"></i> 活動主頁</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
        <a class="navbar-brand navbar-right" href="/pass"> <i class="fa fa-user"></i>
 查詢目前登錄名單</a>
          <a class="navbar-brand navbar-right" href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-phone-square"></i>
 聯絡我們&nbsp;&nbsp;&nbsp;</a>
 
          <a class="navbar-brand navbar-right" target="_blank"  href="https://www.facebook.com/nthugrad/?fref=ts"><i class="fa fa-facebook-square"></i>
 Facebook粉絲專頁&nbsp;&nbsp;&nbsp;</a>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

<div class="container" style="margin-top:20px">
<div class="jumbotron webinfo">
  <h1>Oops！<h1>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;糟糕! 有些答案錯囉! 檢查一下答案再來一次吧!</p>
  <p><a class="btn btn-primary btn-lg" href="/QA" role="button">再...再來一次!</a></p>
</div>
</div>

    % for q in table_data:
      <div class="demo-block">
      <div class="qmain">
        <p>Question #{{q["qid"]+1}}</p>
        <p>{{q["q_body"]}}</p>
      </div>
      <table class="table table-bordered table-hover" style="background-color:white;margin-bottom:0;">
        % for c in ["A","B","C","D"]:
          % if q["YA"]==c:
            % if q["TA"]==c:
              <tr class="success"><td>
                ({{c}}) {{q[c]}} (正確答案) (你的答案)
            % else :
              <tr class="danger"><td>
                ({{c}}) {{q[c]}} (你的答案)
            % end
          % elif q["TA"]==c:
            <tr class="success"><td>
                ({{c}}) {{q[c]}} (正確答案)
          % else:
            <tr><td>
              ({{c}}) {{q[c]}}
          % end
          </td></tr>
        % end
      </table>
    </div>
    % end
	
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">聯絡管理員方式:</h4>
          </div>
          <div class="modal-body">
		    <ul>
              <li>陳柏翰(電資16) <i class="fa fa-envelope"></i> hank101060019@gmail.com</li>
              <li>廖仲文(電機16) <i class="fa fa-envelope"></i> ljw830517@gmail.com</li>
              <li>許菀庭(電機16) <i class="fa fa-envelope"></i> cindyemail0720@yahoo.com.tw</li>
            </ul>
		  </div>
        </div>
      </div>
    </div>
	
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  
  
</body>
</html>
