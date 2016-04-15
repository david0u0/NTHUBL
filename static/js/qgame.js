var questions;
var answer=[];
var student_id;
var student_name;
var student_ph;
window.onload = function(){
  $.ajax({     
    // The URL for the request
    url: "/requestQuestionSet",
    // Whether this is a POST or GET request
    type: "GET",
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function( response, textStatus, request ) {
        //alert(request.getResponseHeader('Cache-control'));
        questions = response["data"];
        load_questions();
        init_fullpage();
        init_infotable();
		checkProfileCookie();
    },
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    }
  });
}

function load_questions(){
  var sectionQ = document.getElementById("section1");
  for(i=0;i<questions.length;i++){
    var slide = document.createElement('div');
    var q_wrapper = document.createElement('div');
    var header = document.createElement('h1');
    var q_body = document.createElement('div');
    var q_options = document.createElement('div');
    var q_buttonA = document.createElement('button');
    var q_buttonB = document.createElement('button');
    var q_buttonC = document.createElement('button');
    var q_buttonD = document.createElement('button');
    slide.setAttribute("class","slide");
    slide.setAttribute("id","slide"+i);
    slide.setAttribute("data-anchor","slide"+i);
    q_wrapper.setAttribute("class","q-wrapper");
    header.innerHTML = "Question #" + (i+1);
    q_body.setAttribute("class","q-body");
    q_body.innerHTML = questions[i]["question"];
    q_options.setAttribute("class","q-options");
    q_buttonA.setAttribute("class","btn btn-primary btn-lg btn-block option");
    q_buttonB.setAttribute("class","btn btn-primary btn-lg btn-block option");
    q_buttonC.setAttribute("class","btn btn-primary btn-lg btn-block option");
    q_buttonD.setAttribute("class","btn btn-primary btn-lg btn-block option");
    q_buttonA.setAttribute("onclick","answer_chosen("+(i+1)+",'A')");
    q_buttonB.setAttribute("onclick","answer_chosen("+(i+1)+",'B')");
    q_buttonC.setAttribute("onclick","answer_chosen("+(i+1)+",'C')");
    q_buttonD.setAttribute("onclick","answer_chosen("+(i+1)+",'D')");
    q_buttonA.setAttribute("id",(i+1)+"A");
    q_buttonB.setAttribute("id",(i+1)+"B");
    q_buttonC.setAttribute("id",(i+1)+"C");
    q_buttonD.setAttribute("id",(i+1)+"D");
    q_buttonA.innerHTML = "(A) " + questions[i]["optionA"];
    q_buttonB.innerHTML = "(B) " + questions[i]["optionB"];
    q_buttonC.innerHTML = "(C) " + questions[i]["optionC"];
    q_buttonD.innerHTML = "(D) " + questions[i]["optionD"];

    q_options.appendChild(q_buttonA);
    q_options.appendChild(q_buttonB);
    q_options.appendChild(q_buttonC);
    q_options.appendChild(q_buttonD);
    q_wrapper.appendChild(header);
    q_wrapper.appendChild(q_body);
    q_wrapper.appendChild(q_options);
    slide.appendChild(q_wrapper);

    sectionQ.appendChild(slide);
  }
}

function init_fullpage(){
  $('#fullpage').fullpage({
    sectionsColor: ['#FFF795', '#4BBFC3', '#8DD084'],
    anchors: ['firstPage', 'secondPage', '3rdPage'],
    menu: '#menu',
    easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    slidesNavigation: true,
    onLeave:slide_leave
  });
}

function answer_chosen(qid, op){
  if(qid<questions.length){
    answer[qid-1] = {
      id:questions[qid-1]["_id"],
      ans:op
    };

    $.fn.fullpage.moveSlideRight();
  } else if(qid==questions.length){
    answer[qid-1] = {
      id:questions[qid-1]["_id"],
      ans:op
    };
    $.fn.fullpage.moveSectionDown();
  } else {
    return;
  }
  $("#"+qid+"A").removeClass("btn-danger");
  $("#"+qid+"B").removeClass("btn-danger");
  $("#"+qid+"C").removeClass("btn-danger");
  $("#"+qid+"D").removeClass("btn-danger");
  $("#"+qid+op).addClass("btn-danger");
}

function submit_answer()
{
  if(!check_data_valid()){
    return;
  }
  
  $.removeCookie("student_id");
  $.removeCookie("student_name");
  $.removeCookie("student_ph");
  $.cookie("student_id",student_id);
  $.cookie("student_name",student_name);
  $.cookie("student_ph",student_ph);
  $.ajax({
            type: "POST",
            url: "/evalAnswer",
            contentType: "application/json",
            dataType: "html",
            data: JSON.stringify({N:questions.length,
                                  student_id:student_id,
                                  student_name:student_name,
                                  student_ph:student_ph,
                                  dict:answer}),
            success: function (response, textStatus, request) {
               document.write(response);
            },
            error: function (xhr, status, errorThrown) {
             alert('Error');
             console.log( "Error: " + errorThrown );
             console.log( "Status: " + status );
             console.dir( xhr );
            }
        });
}

function check_data_valid(){
  student_id = document.getElementById("student_id").value;
  student_name = document.getElementById("student_name").value;
  student_ph = document.getElementById("student_ph").value;
  if(!student_id || !student_name || !student_ph)
  {
    alert("請填寫基本資料!");
    $.fn.fullpage.moveTo(1);
    return false;
  }
  if(!answer.length || (answer.length != questions.length)){
    alert("作答不完整!");
    $.fn.fullpage.moveTo(2);
    return false;
  }
  for(i=0;i<answer.length;i++){
    if(!answer[i]) {
      alert("作答不完整!");
      $.fn.fullpage.moveTo(2,i);
      return false;
    }
  }
  return true;
}

function init_infotable(){
  var qnum_row = document.getElementById("info-qnum");
  var qans_row = document.getElementById("info-qans");
  for(i=0;i<questions.length;i++){
    var qnum = document.createElement('td');
    var qans = document.createElement('td');
    qnum.setAttribute("id","qnum"+i);
    qans.setAttribute("id","qans"+i);
    qnum.innerHTML = (i+1);
    qans.innerHTML = '-';
    qnum_row.appendChild(qnum);
    qans_row.appendChild(qans);
  }
}

function slide_leave(index, nextIndex, direction){
  if(index==1){
    document.getElementById("info-id").innerHTML = document.getElementById("student_id").value;
    document.getElementById("info-name").innerHTML = document.getElementById("student_name").value;
    document.getElementById("info-ph").innerHTML = document.getElementById("student_ph").value;
  } else if(index==2 && direction=='down'){
    for(i=0;i<questions.length;i++){
      var qans = document.getElementById("qans"+i);
      ans = answer[i];
      if(!ans) continue;
      qans.innerHTML = ans['ans'];
    }
  }
}

function checkProfileCookie(){
	student_id = $.cookie("student_id");
	student_name = $.cookie("student_name");
	student_ph = $.cookie("student_ph");
	if(student_id && student_name && student_ph){
	  document.getElementById("student_id").value = student_id;
	  document.getElementById("student_name").value = student_name;
	  document.getElementById("student_ph").value = student_ph;
	  $("#box-id").addClass("is-upgraded");
	  $("#box-name").addClass("is-upgraded");
	  $("#box-ph").addClass("is-upgraded");
	  $("#box-id").addClass("is-dirty");
	  $("#box-name").addClass("is-dirty");
	  $("#box-ph").addClass("is-dirty");
	  $.fn.fullpage.moveSectionDown();
	}
}
