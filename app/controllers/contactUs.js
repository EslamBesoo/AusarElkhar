// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _Service=require("xhrService");
function sendSMS(){
	var x={
		name:$.txtName.value,
		email:$.txtEmail.value,
		title:$.txtTitle.value,
		note:$.txtNotes.value
	};
	_Service.postservice(function(_response){
				 
		    		if (_response.success) {
		    			toast("تم ارسال الرسالة للإدارة");
						    $.txtName.value="";
							$.txtEmail.value="";
							$.txtTitle.value="";
							$.txtNotes.value="";
				}
				else{
					toast("Serrver Erorr ...");
				};
			},"send_complain",$.contactUs,x,"send_complain");
};



function checkControl(){
	if (($.txtEmail.value=="") || ($.txtName.value=="") || ($.txtTitle.value=="") || ($.txtNotes.value=="") ) {
		toast("من فضلك املاء كل البيانات");
		} else{sendSMS();};
};
