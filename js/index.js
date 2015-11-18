var noneRecord=0, addRecord=1, deleteRecord=2, editRecord=3;
var finalRecord = 0;
var finalRecordList = [0,0,0];

function zipInJson(data){
	var rows = $('#orderTable tr');
	var records = [];
	for(var i=1;i<rows.length;i++){
		
		var row = rows[i];

		var id = row.getElementsByTagName('TD')[0].innerHTML,
			description = row.getElementsByTagName('TD')[1].innerHTML,
			quantity = row.getElementsByTagName('TD')[2].innerHTML,
			amount = row.getElementsByTagName('TD')[3].innerHTML,
			vat = row.getElementsByTagName('TD')[4].innerHTML,
			vat_percentage = row.getElementsByTagName('TD')[5].innerHTML;

		var eachElement = {
			id: id,
			description: description,
			quantity: quantity,
			amount: amount,
			vat: vat,
			vat_percentage: vat_percentage,
			pointer: finalRecordList[i-1]
		};

		records.push(eachElement);
	}

	var obj = {
	   invoices:[
	      {
	         invoice_id:0,
	         invoice_number:"",
	         records: records,
	         date:"Nov 12, 2015 3:28:17 PM",
	         invoicer_address:"add",
	         registration_number:0,
	         VAT_number:0,
	         email:"asd",
	         client_address:"asd",
	         client_name:"asd",
	         client_email:"asd"
	      }
	   ]
	};
	console.log(JSON.stringify(obj));
}


$('#submitJson').click(function(){
	
	var jsonData={"name":"Hello World"};
	// JSON.stringify(jsonData); 

	zipInJson(jsonData);

	$.ajax({
        url: '/kuan/Invoice',
        data: jsonData,
        type: "POST"
//        success: function (data) {
//            // console.log(data);
//            Window.location.href('localhost:8080/kuan/Invoice');
//        },
//        error: function(data) {
//            handleRequestError(data);
//        }
    }).done(function(){
        window.location.href="/kuan/Invoice";
    });
});

function addRow(){
	// if there is already an add button there.
	if(document.getElementById('tempRow') != null) return;
	document.getElementById("orderTable").innerHTML +=
	'<TR id="tempRow">' +
	    '<TD>' +
	      '<INPUT id="addId" class="inputGroup" TYPE="TEXT" NAME="ID">' +
	    '</TD>' +
	    '<TD>' +
	      '<INPUT id="addDes" class="inputGroup" TYPE="TEXT" NAME="DES">' +
	    '</TD>' +
	    '<TD>' +
	      '<INPUT id="addQua" class="inputGroup" TYPE="TEXT" NAME="QUA">' +
	    '</TD>' +
	    '<TD>' +
	      '<INPUT id="addAmo" class="inputGroup" TYPE="TEXT" NAME="AMO">' +
	    '</TD>' +
	    '<TD>' +
	      '<INPUT id="addVAT" class="inputGroup" TYPE="TEXT" NAME="VAT">' +
	    '</TD>' +
	    '<TD>' +
	      '<INPUT id="addVATPer" class="inputGroup" TYPE="TEXT" NAME="VATPER">' +
	    '</TD>' +
	    '<TD> <button class="push_button red" id="confirmAdd" type="button">Add</button>'+
	    '<button class="confirmDelete push_button red" type="button">Delete</button> </TD>' +
	'</TR>';	
	document.getElementById("confirmAdd").addEventListener("click", confirmAdd);
	$(".confirmDelete" ).click(function() {
		this.parentElement.parentElement.remove();
	});
}

function confirmAdd(){
	var idValue = document.getElementById("addId").value,
		desValue = document.getElementById("addDes").value,
		quaValue = document.getElementById("addQua").value,
		amoValue = document.getElementById("addAmo").value,
		vatValue = document.getElementById("addVAT").value,
		vatPerValue = document.getElementById("addVATPer").value;

	document.getElementById("orderTable").innerHTML += 
	'<TR>' +
	  '<TD>' + idValue + '</TD>' +
	  '<TD>' + desValue + '</TD>' +
	  '<TD>' + quaValue + '</TD>' +
	  '<TD>' + amoValue + '</TD>' +
	  '<TD>' + vatValue + '</TD>' +
	  '<TD>' + vatPerValue + '</TD>' +
	  '<td> <button class="confirmDelete push_button red" type="button">Delete</button> </td>'+
	'</TR>';

	$(".confirmDelete" ).click(function() {
		this.parentElement.parentElement.remove();
	});

	document.getElementById("tempRow").remove();

	finalRecord = addRecord
	finalRecordList.push(finalRecord);
}


/*
function deleteRow(){
	var allTR = document.getElementsByTagName("TR");
	var element;
	for(var i=1;i<allTR.length;i++){
		element = allTR[i];
		element.innerHTML += '<TD><button class="confirmDelete" type="button" style="width: 80px;">Delete</button></TD>';
	}
	var allDelete = document.getElementsByClassName("confirmDelete");
	for(var i=0;i<allDelete.length;i++){
		allDelete[i].addEventListener("click",confirmDelete);
	}
}
*/

$(".confirmDelete" ).click(function() {
	this.parentElement.parentElement.remove();
});


var editPointer = 0;

function editRow(){
	if(editPointer == 1 || document.getElementById('tempRow') != null) return;

	var allTR = document.getElementsByTagName("TR");
	var previousRowsData = [];

	for(var i=1;i<allTR.length;i++){

		var previousRow = [];
		for(var u=0;u<6;u++){
			previousRow.push(allTR[i].getElementsByTagName('TD')[u].innerHTML);
		}
		previousRowsData.push(previousRow);
		// console.log(previousRowsData);

		var element = allTR[i];
		element.innerHTML=
			'<TR class="tempRow">' +
			    '<TD>' +
			      '<INPUT class="addId inputGroup" TYPE="TEXT" NAME="ID" value="'+
			      allTR[i].getElementsByTagName('TD')[0].innerHTML + '">' +
			    '</TD>' +
			    '<TD>' +
			      '<INPUT class="addAmount inputGroup" TYPE="TEXT" NAME="AMOUNT" value="'+
			      allTR[i].getElementsByTagName('TD')[1].innerHTML + '">' +
			    '</TD>' +
			    '<TD>' +
			      '<INPUT class="addCurrency inputGroup" TYPE="TEXT" NAME="CURRENCY" value="'+
			      allTR[i].getElementsByTagName('TD')[2].innerHTML + '">' +
			    '</TD>' +
			    '<TD>' +
			      '<INPUT class="addCurrency inputGroup" TYPE="TEXT" NAME="CURRENCY" value="'+
			      allTR[i].getElementsByTagName('TD')[3].innerHTML + '">' +
			    '</TD>' +
			    '<TD>' +
			      '<INPUT class="addCurrency inputGroup" TYPE="TEXT" NAME="CURRENCY" value="'+
			      allTR[i].getElementsByTagName('TD')[4].innerHTML + '">' +
			    '</TD>' +
			    '<TD>' +
			      '<INPUT class="addCurrency inputGroup" TYPE="TEXT" NAME="CURRENCY" value="'+
			      allTR[i].getElementsByTagName('TD')[5].innerHTML + '">' +
			    '</TD>' +
			'</TR>';	

		var allEdit = document.getElementsByClassName("confirmEdit");
	}	

	$(' <button class="confirmEdit push_button blue" type="button" '+
		'> Confirm </button>').insertAfter('#editButton');
	$('.confirmEdit').click(function(){
		confirmEdit(previousRowsData);
		}
	);
	editPointer = 1;
}

function confirmEdit(data){
	console.log(data);

	var idValue, desValue, quaValue,amoValue,vatValue,vatPerValue;

	for(var i=1; i<$('#orderTable TR').length;i++){
		
		idValue = $('#orderTable TR')[i].getElementsByTagName('TD')[0].getElementsByTagName('INPUT')[0].value;
		desValue = $('#orderTable TR')[i].getElementsByTagName('TD')[1].getElementsByTagName('INPUT')[0].value;
 		quaValue = $('#orderTable TR')[i].getElementsByTagName('TD')[2].getElementsByTagName('INPUT')[0].value;
 		amoValue = $('#orderTable TR')[i].getElementsByTagName('TD')[3].getElementsByTagName('INPUT')[0].value;
 		vatValue = $('#orderTable TR')[i].getElementsByTagName('TD')[4].getElementsByTagName('INPUT')[0].value;
 		vatPerValue = $('#orderTable TR')[i].getElementsByTagName('TD')[5].getElementsByTagName('INPUT')[0].value;


		for(var q=0;q<data[i-1].length;q++){
			var oneValue = $('#orderTable TR')[i].getElementsByTagName('TD')[q].getElementsByTagName('INPUT')[0].value;
			console.log(data[i-1][q], oneValue);
			if(oneValue != data[i-1][q]) finalRecordList[i-1] = editRecord;
		}

 		$('#orderTable TR')[i].innerHTML='<TR>' +
		  '<TD>' + idValue + '</TD>' +
		  '<TD>' + desValue + '</TD>' +
		  '<TD>' + quaValue + '</TD>' +
		  '<TD>' + amoValue + '</TD>' +
		  '<TD>' + vatValue + '</TD>' +
		  '<TD>' + vatPerValue + '</TD>' +
		  '<td> <button class="confirmDelete push_button red" type="button">Delete</button> </td>'+
		'</TR>';
	}

	

	$(".confirmDelete" ).click(function() {
		this.parentElement.parentElement.remove();
	});
	$('.confirmEdit').remove();
	editPointer = 0;
}