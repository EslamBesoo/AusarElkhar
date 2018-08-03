// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _Service=require("xhrService");
var xxx=[];
//alert(Ti.App.Properties.getString("userID"));

if (Ti.App.Properties.getString("userID")==null) {
	toast("يجب ان تسجل اولا");
} else{
	
	inti();
};
Ti.API.info('user from Order history: '+Ti.App.Properties.getString("userID"));
function inti(){
	_Service.getservice(function(_response){
				 
		    		if (_response.success) {
		    		    try{

					var waittingOrder= _response.data.Data.waitting;
					Ti.API.info("All wat: "+JSON.stringify(waittingOrder));
					var preparationOrder= _response.data.Data.preparation;
					var onTheWayOrder= _response.data.Data.onTheWay;
					var DoneOrder= _response.data.Data.Done;
					if (waittingOrder.length>0) {
					
						for (var i=0; i < waittingOrder.length; i++) {
							 var rowItem= waittingOrder[i];
							Ti.API.info(waittingOrder.length+' cart inv: '+JSON.stringify(rowItem));
							 //var rowController=Alloy.createController('row/rowStorOrder',rowItem);
							// $.tbl.appendRow(rowController.getView() , true);
							  getInv(waittingOrder[i]);
							 };//End for
						rowItem=null;
						rowController=null;
						
						for (var i=0; i < preparationOrder.length; i++) {
							 var rowItem= preparationOrder[i];
							// var rowController=Alloy.createController('row/rowStorOrder',rowItem);
							 //$.tbl.appendRow(rowController.getView() , true);
							  getInv(preparationOrder[i]);
						};//End for
						_Service=null;
						rowItem=null;
						rowController=null;
						
						for (var i=0; i < onTheWayOrder.length; i++) {
							 var rowItem= onTheWayOrder[i];
							 // var rowController=Alloy.createController('row/rowStorOrder',rowItem);
							 //$.tbl.appendRow(rowController.getView() , true);
							  getInv(onTheWayOrder[i]);
						};//End for
						
						rowItem=null;
						rowController=null;
						
						for (var i=0; i < DoneOrder.length; i++) {
							 var rowItem= DoneOrder[i];
							 // var rowController=Alloy.createController('row/rowStorOrder',rowItem);
							// $.tbl.appendRow(rowController.getView() , true);
							  getInv(DoneOrder[i]);
						};//End for
						
						rowItem=null;
						rowController=null;
						
						} else{toast(waittingOrder.length+"لا يوجد لديك طلبات الان",$.dealerOrder);$.dealerOrder.close();}
						}catch(e){};//if nout found internet not view error 
				}
				else{
					toast("لا يوجد لديك طلبات الان");
				};
			},"get_store_cart?user_id="+Ti.App.Properties.getString("userstoreID"),"get_cart",$.dealerOrder);

					var waittingOrder=null;
					var preparationOrder=null;
					var onTheWayOrder=null;
					var DoneOrder=null;
};

	

function getInv(data){
	Ti.API.info("All: "+JSON.stringify(data));
	
	var datastor={phone:data.phone,name:data.name};
	var data=data.carts;
	Ti.API.info("stor: "+JSON.stringify(datastor));
	for (var i=0; i < data.length; i++) {
							 var rowItem= data[i];
							 //Ti.API.info('cart inv: '+JSON.stringify(waittingOrder));
							 var rowController=Alloy.createController('row/rowOrder',{data:rowItem,id:0,storeData:datastor,userType:"dealer"});
							 $.tbl.appendRow(rowController.getView() , true);
							 //waitItem(waittingOrder[i].Proudcts);
						};//End for
						datastor=null;
						data=null;
						rowItem=null;
						rowController=null;
						
};

function getItems(e){
	/*//alert(JSON.stringify(e.row.args.storeData));/*
	if (e.row.objName=="inv") {
	   var x={title:" فاتورة رقم "+e.row.args.data.cart_id,invID:e.row.args.data.cart_id,back:true,storData:e.row.args.storeData};
	    Alloy.createController("orderProductList",x).getView().open();
	    x=null;
	};*/
};
