// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");

function loginUserData(){
	var x={
		email:$.txtEmail.value,
		};
	try{
	   _getService.postservice(function(_response){
        Ti.API.info(JSON.stringify(_response));
       
        	try{
        		 if (_response.success) {
        			if (_response.data.Flag){
		            toast(_response.data.Massage);
		            
				}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
        	}catch(e){};
    },"forget_pass",$.loginUser,x,"add_cart");
    }catch(e){alert(e.message);};
};


function loginUser(){
	if ($.txtEmail.value=="") {
		toast("من فضلك ادخل البريد الإلكتروني");
		} else{loginUserData();};
};


