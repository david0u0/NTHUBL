// Using the core $.ajax() method
$.ajax({     
    // The URL for the request
    url: "/getAllQuestions",
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function( response ) {
        questions = response["data"];
        demo_table = document.getElementById("demo_table").getElementsByTagName('tbody')[0];
        for(i=0; i<questions.length; i++){
          rowCount = demo_table.rows.length;
          row = demo_table.insertRow(rowCount);
          var cell_0 = row.insertCell(0); // number
          var cell_1 = row.insertCell(1); // question
          var cell_2 = row.insertCell(2); // A
          var cell_3 = row.insertCell(3); // B
          var cell_4 = row.insertCell(4); // C
          var cell_5 = row.insertCell(5); // D
          var cell_6 = row.insertCell(6); // answer
          var cell_7 = row.insertCell(7); // delete
          var button = document.createElement("input");
          button.setAttribute("value", "刪除");
          button.setAttribute("type", "button");
          button.setAttribute("onClick","delete_question('" + questions[i]["_id"] + "')");
          cell_0.innerHTML = rowCount+1;
          cell_1.innerHTML = questions[i]["question"];
          cell_2.innerHTML = questions[i]["optionA"];
          cell_3.innerHTML = questions[i]["optionB"];
          cell_4.innerHTML = questions[i]["optionC"];
          cell_5.innerHTML = questions[i]["optionD"];
          cell_6.innerHTML = questions[i]["answer"];
          cell_7.appendChild(button);
        }
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

$.ajax({     
    // The URL for the request
    url: "/getAllContestants",
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function( response ) {
        contestants = response["data"];
        contestant_table = document.getElementById("contestant_table").getElementsByTagName('tbody')[0];
        for(i=0; i<contestants.length; i++){
          rowCount = contestant_table.rows.length;
          row = contestant_table.insertRow(rowCount);
          var cell_0 = row.insertCell(0); // number
          var cell_1 = row.insertCell(1); // student ID
          var cell_2 = row.insertCell(2); // name
          var cell_3 = row.insertCell(3); // phone
          var cell_4 = row.insertCell(4); // date
          var cell_5 = row.insertCell(5); // IP
          cell_0.innerHTML = rowCount+1;
          cell_1.innerHTML = contestants[i]["student_id"];
          cell_2.innerHTML = contestants[i]["student_name"];
          cell_3.innerHTML = contestants[i]["student_ph"];
          cell_4.innerHTML = contestants[i]["date"];
          cell_5.innerHTML = contestants[i]["client_ip"];
        }
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

function delete_question(id)
{
  if(confirm('Going to delete : '+id+'. Are you sure?')){
    var form = document.createElement("form");
    var element = document.createElement("input");

    form.method = "POST";
    form.action = "deleteQuestion";


    element.value=id;
    element.name="objid";
    element.type='hidden'
    form.appendChild(element);

    document.body.appendChild(form);
    form.submit();
  } else {
    return;
  }
}
