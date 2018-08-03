// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
 var _getService=require("xhrService");
$.txtAddress.value= Ti.App.Properties.getString("myAddress");

function checkAddress(){
	if (($.txtAddress.value=="") || ($.txtAddress.value==null)) {
		toast("من فضلك ادخل العنوان اولا");
	}else{
		 Ti.App.Properties.setString("myAddress",$.txtAddress.value);
		args.data.address=Ti.App.Properties.getString("myAddress");
		Ti.API.info('post Order : '+JSON.stringify(args.data));
		 sendInvoice(args.data);
	};
};

function sendInvoice(xdata){
	_getService.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('done: '+JSON.stringify(_response));
		    			if (_response.data.Flag){
		    				_getdb.deletfromCArt();
							$.lblDonemsg.text="تم ارسال طلبك الي الشركة وسيتم  التواصل معك خلال ٢٤ ساعة";
							$.txtAddress.visible=false	;	
		    			} else{toast(_response.data.Massage);};
		    		    
				}else{
					toast("Serrver Erorr ...");
					Ti.API.info('err: '+JSON.stringify(_response));
				};
			},"add_cart",$.createNewUser,xdata,"add_cart");
			

};


