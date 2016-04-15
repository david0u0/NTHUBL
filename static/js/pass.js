function ping_id(){
	var query_id = document.getElementById("query_id").value;
	$.ajax({
	        type: "POST",
	        url: "/checkIdExist",
	        contentType: "application/json",
	        dataType: "json",
	        data: JSON.stringify({query_id:query_id}),
	        success: function (response, textStatus, request) {
	        	if(response['exist']==1){
	        		document.getElementById("resultbox").innerHTML = "此學號("+query_id+")已成功登錄於伺服器中!<br>登錄時間 : "+response['date_in'];
	        	} else {
	        		document.getElementById("resultbox").innerHTML = "查無此學號 : "+query_id+" !<br>若有疑問請洽畢聯會粉絲專頁!";
	        	}
	        },
	        error: function (xhr, status, errorThrown) {
	         alert('Error');
	         console.log( "Error: " + errorThrown );
	         console.log( "Status: " + status );
	         console.dir( xhr );
	        }
	    });
}