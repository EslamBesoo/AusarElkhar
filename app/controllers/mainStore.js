// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _Service=require("xhrService");
Ti.API.info('UserStoreID: '+Ti.App.Properties.getString("userstoreID"));
$.lblTitle.text=Ti.App.Properties.getString("userstoreName");
function getStores(){

						for (var i=0; i < args.data.length; i++) {
							 var rowItem= args.data[i];
							 var rowController=Alloy.createController('row/rowDealerStore',rowItem);
							 $.tbl.appendRow(rowController.getView() , true);
						};//End for
					
	
};

getStores();