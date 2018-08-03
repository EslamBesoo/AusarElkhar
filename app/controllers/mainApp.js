// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var _Service=require("xhrService");
	_Service.getservice(function(_response){
				 
		    	if (_response.success) {
		    		    try{
					var responseData= _response.data.Data;
				
						Ti.API.info('category: '+JSON.stringify(responseData));
						//$.tbl.appendRow(Alloy.createController('view/advSlider',_response.data.Data.Adv).getView() , true);
						for (var i=0; i < responseData.length; i++) {
							 var rowItem= responseData[i];
							 var rowController=Alloy.createController('row/rowCategory',rowItem);
							 $.tbl.appendRow(rowController.getView() , true);
						};//End for
						responseData=null;
						rowItem=null;
						rowController=null;
					
						}catch(e){};//if nout found internet not view error 
				}
				else{
					toast("لا يوجد محلات في هذه المنطقة ");
				};
	},"get_category","itemList",$.mainApp);
			
