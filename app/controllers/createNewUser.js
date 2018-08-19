// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
//alert(JSON.stringify(args.data));
function reg(){
	if (($.txtEmail.value=="") || ($.txtPhone.value=="") || ($.txtUser.value=="") || ($.txtPassword.value=="") ) {
		toast("من فضلك املاء كل البيانات");
		} else{postUserData();};
};
function getCountry(){
	 var x={
			 	title:$.lblCountry.objName,
			 	param:"country",
			 	cont:$.lblCountry
		 	};
   Alloy.createController("listPopupWin",x).getView().open(); 
};

function getCity(){ 
	 var x={
			 	title:$.lblCity.objName,
			 	param:"city",
			 	cont:$.lblCity,
			 	cID:$.lblCountry.className,
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("listPopupWin",x).getView().open(); 
};


function postUserData(){
	var x={
		email:$.txtEmail.value,
		phone:$.txtPhone.value,
		fullname:$.txtUser.value,
		password:$.txtPassword.value,
		city_id:3,//$.lblCountry.className,
		country_id:1,//$.lblCity.className,
		};
	try{
	   _getService.postservice(function(_response){
        //alert(JSON.stringify(_response));
        if (_response.success) { 
        	if (_response.data.Flag){
        	 datax=_response.data.Data;  
        	 Ti.API.info('datax reg user: '+JSON.stringify(_response));
             Ti.App.Properties.setString("userID",datax.user_id);
             Ti.App.Properties.setString("userName",datax.fullname);
             Ti.App.fireEvent("activeUser");
             
           Ti.API.info('pkQty: '+pkQty);
             if (pkQty==0) {
				  closeAll();
	    		} else{
	    			  closeAll();
	    			var x={title:"سلة الشراء",back:true};
	    		Alloy.Globals.Navigator.open("cartList",x); 
	    		
	    		};
             
             
}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },"sign_up",$.createNewUser,x,"add_cart");
    }catch(e){alert(e.message);};
};



function sendInvoice(xdata){
	_getService.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('done: '+JSON.stringify(_response));
		    			if (_response.data.Flag){
							go2Done();
									
		    			} else{toast(_response.data.Massage);};
		    		    
				}else{
					toast("Serrver Erorr ...");
					Ti.API.info('err: '+JSON.stringify(_response));
				};
			},"add_cart",$.createNewUser,xdata,"add_cart");
			

};