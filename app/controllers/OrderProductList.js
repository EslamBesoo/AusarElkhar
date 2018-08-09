// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.lblOrderID.text=" \n"+" طلب رقم "+args.data.cart_id;
$.lblOrderDate.text=" تاريخ الطلب "+args.data.createdatetime;
$.lblOrderCost.text=" الاجمالي "+args.data.total_price+" "+currancyType;
$.lblOrderAddress.text=" عنوان التوصيل " +args.data.address+" \n";
$.lblOrderType.text=" حالة الطلب "+args.status;
var statusOrder=1;
if (args.userType=="dealer") {
	if (args.data.status==0) {
		statusOrder=1;
		$.lblstatusOrder.text="   تغير الي تحت التجهيز   ";
		
	} else if (args.data.status==1){
		statusOrder=2;
		$.lblstatusOrder.text="   تغير الي تم التسليم   ";
	}else{
		//statusOrder=5;
		//$.vswich.visible=false;
		//$.topView.height=35;
		//$.lblstatusOrder.text="   قيم التاجر   ";
		};
} else{
	/*if (args.data.status >1) {
		statusOrder=5;
		$.lblstatusOrder.text="   قيم التاجر   ";
	}*/
};

 

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
    },"get_proudct_cart",$.OrderProductList,x,"storesList");
};//end inti


var alertDlg;
function changeStatusOrder(){
	if (statusOrder!=5) {
	 updateData();
	 }else{
	 	 var x={title:"تقيم التاجر",back:true,data:args};
   		Alloy.Globals.Navigator.open("rateUser",x); 
	 };
	/*alertDlg = Titanium.UI.createAlertDialog({
				    title:'حالة الطلب', 
				    message:" هل تريد تغير حالة الطلب الي  ",//'GPS is OFF.  Enable it in Settings.',
				    buttonNames: ["الغاء","موافق "]
				});
				alertDlg.cancel = 0;
		
				alertDlg.addEventListener('click', function(e){
				    if(!e.cancel) {
				    updateData();
				    }else {
						   	$.basicSwitch.value=false;
				    }
				});
				
		alertDlg.show();*/
};


function updateData(){
	var _Service=require("xhrService");
				    var x={
				    	user_id:Ti.App.Properties.getString("userstoreID"),
				    	cart_id:args.id,
						status:statusOrder,
					
					};
					
				_Service.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('change_status Done: '+JSON.stringify(_response));
		    			//Ti.App.fireEvent("reloadMyOrderData");
		    			toast("تم تغير حالة الطلب ");
						//inti();	 
					}else{
						toast("توجد مشكلة الآن حاول مرة اخري");
						$.OrderProductList.close();
						Ti.API.info('change_statusr: '+JSON.stringify(_response));
						};
			},"change_status",$.OrderProductList,x,"change_status_order");
				  
	
};
