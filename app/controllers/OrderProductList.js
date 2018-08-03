// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.lblOrderID.text=" طلب رقم "+args.data.cart_id;
$.lblOrderDate.text=" تاريخ الطلب "+args.data.createdatetime;
$.lblOrderCost.text=" الاجمالي "+args.data.total_price+" "+currancyType;
$.lblOrderAddress.text=" عنوان التوصيل " +args.data.address;;

var _getService=require("xhrService");

inti();
function inti(){
x={cart_id:args.id};
    _getService.postservice(function(_response){
        if (_response.success) {  datax=_response.data.Data;  
        	
        	if (datax.length>0) {
					
						for (var i=0; i < datax.length; i++) {
							 var rowItem= datax[i];
							
							 var rowController=Alloy.createController('row/rowOrderProductList',rowItem);
							 $.tbl.appendRow(rowController.getView() , true);
							 };//End for
       };
 Ti.API.info(JSON.stringify(_response));
             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_proudct_cart",$.storesList,x,"storesList");
};//end inti
