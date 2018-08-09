// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


var _Service=require("xhrService");
	_Service.getservice(function(_response){
				 
		    	if (_response.success) {
		    		    try{
					var responseData= _response.data.Data;
						Ti.API.info('policeAbout: '+JSON.stringify(responseData));
						$.lblTitle.text=responseData;
						responseData=null;
						
						}catch(e){};//if nout found internet not view error 
				}
				else{
					//toast("لا يوجد محلات في هذه المنطقة ");
				};
	},args.url,"itemList",$.policeAbout);
			