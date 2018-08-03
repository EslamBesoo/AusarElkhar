// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (args=="mainStore") {
	$.vHome.backgroundColor="#4abfe8";
	$.imgMain.image="/images/btn/other/home.png";
	$.lblMain.color="#ffffff";
}else if (args=="dealerAddItem") {
	$.vItem.backgroundColor="#4abfe8";
	$.imgItem.image="/images/cart/plus.png";
	$.lblItem.color="#ffffff";
}else if (args=="dealerOrder") {
	$.vOrder.backgroundColor="#4abfe8";
	$.imgOrder.image="/images/btn/other/list.png";
	$.lblOrder.color="#ffffff";
}else{
	$.vStore.backgroundColor="#4abfe8";
	$.imgStore.image="/images/cart/plus.png";
	$.lblStore.color="#ffffff";
};


function openAddItem(){
	closeAll();
	if (args!="dealerAddItem") {
		var x={title:$.lblItem.text,back:true,userType:"dealer"};
	    var win= Alloy.Globals.Navigator.open("dealerAddItem",x); 
		
	}
};

function openOrder(){
	closeAll();
	if (args!="myOrders") {
		var x={title:$.lblOrder.text,back:true,userType:"dealer"};
	    var win= Alloy.Globals.Navigator.open("dealerOrder",x); 
		
	}
	
};

function openAddStore(){
		closeAll();
	if (args!="dealerAddStore") {
		var x={title:$.lblStore.text,back:true,userType:"dealer"};
	    var win= Alloy.Globals.Navigator.open("dealerAddStore",x); 
		
	}
};

function openMain(){
	
	if (args!="mainApp") {
	closeAll();
		//var x={title:$.lblMain.text,back:true,userType:"dealer"};
	    //var win= Alloy.Globals.Navigator.open("mainStore",x); 
	}
};


 function closeAll(){
        for (var i=0; i < appSec.length; i++) {
                 try{
                         var winx= appSec[i];
                          	winx.close();
                 }catch(e){};
                };               
    };
    
function checkGPSData(){
		if (Ti.Geolocation.locationServicesEnabled) {
		getlocation();//check IOS
		var longitude =Ti.App.Properties.getString("long");
    var latitude = Ti.App.Properties.getString("lat");
	
		if (longitude==null || longitude==""){ 
			toast("غير قادر علي تحديد موقك ٫ تأكد من ان الانترنت مفتوح ثم افتح ال GPS");
		
		}else
	inti(myLoc);
	}else{
		var opengps = require('Gps_AccessFromSetting');
       	opengps._checkGPS();//check IOS
       	Ti.API.info('من فضلك افتح اللوكيشن');
		};
};