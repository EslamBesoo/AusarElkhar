// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.lblOrderID.text=" طلب رقم "+args.data.cart_id;
$.lblDate.text=args.data.createdatetime;
$.lblTotal.text=args.data.total_price;

if (args.id==0) {
	$.lblCase.text="في قائمة الانتطار";
	$.lblCase.color="#F44336";
}else if (args.id==1) {
	$.lblCase.text="جاري التجهير";
	$.lblCase.color="#2c9047";
}else if (args.id==2) {
	$.lblCase.text="يالطريق اليك";
	$.lblCase.color="#2c9047";
}else {
	$.lblCase.text="تم التوصيل";
	$.lblCase.color="#000000";
};
Ti.API.info('args prder: '+JSON.stringify(args));

$.lblCompName.text=args.storeData.name;
$.lblCompPhone.text=args.storeData.phone;

$.row.args=args;

function CallComp(){
	Titanium.Platform.openURL('tel:'+args.storeData.phone);
};


function getItem(){
	 var x={title:"تفاصيل الطلب",back:true,id:args.data.cart_id,data:args.data,userType:args.userType};
   		Alloy.Globals.Navigator.open("OrderProductList",x); 
};


if (OS_IOS) {
	var w=Ti.Platform.displayCaps.platformWidth;
	$.view1header.width=(w*.90);
	$.viewDeatialOrder.width=(w*.85);
	$.viewfooterOrder.width=(w*.85);
};