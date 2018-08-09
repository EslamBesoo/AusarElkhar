// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _Service=require("xhrService");
var control = Ti.UI.createRefreshControl({ tintColor:'#2c9047'}); $.tbl.refreshControl=control;
Ti.API.info('UserStoreID: '+Ti.App.Properties.getString("userstoreID"));
$.lblTitle.text=Ti.App.Properties.getString("userstoreName");
function getStores(){
	$.tbl.data=[];
  var x={user_id:Ti.App.Properties.getString("userstoreID")}	;				
						
						_Service.postservice(function(_response){
				 
		    	if (_response.success) {
		    		    try{
					var responseData= _response.data.Data;
				
						Ti.API.info('category: '+JSON.stringify(responseData));
						for (var i=0; i < responseData.length; i++) {
							 var rowItem= responseData[i];
							 var rowController=Alloy.createController('row/rowDealerStore',rowItem);
							 $.tbl.appendRow(rowController.getView() , true);
						};//End for
						responseData=null;
						rowItem=null;
						rowController=null;
					
						}catch(e){};//if nout found internet not view error 
				}
				else{
					toast("ابدأ الان بإضافة محلاتك  ");
				};
	},"get_my_store",$.mainStore,x,"get_my_store");
			
				
	
};



Ti.App.addEventListener("resetStorData",getStores);
getStores();

control.addEventListener('refreshstart',function(e){
    Ti.API.info('refreshstart');
    setTimeout(function(){
        Ti.API.debug('Timeout');
       getStores();
       // section.appendItems(genData());
      // $.tbl.setHeaderView(Ti.UI.createView({height:120,backgroundColor:"yellow"}));
        control.endRefreshing();
       //checkGPSData();
    }, 2000);
});