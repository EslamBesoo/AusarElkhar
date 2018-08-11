// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (args=="mainApp") {
	$.vHome.backgroundColor="#4abfe8";
	$.imgMain.image="/images/btn/other/home.png";
	$.lblMain.color="#ffffff";
}else if (args=="SearchItem") {
	$.vSearch.backgroundColor="#4abfe8";
	$.imgSearch.image="/images/btn/other/home.png";
	$.lblSearch.color="#ffffff";
}else if (args=="myOrders") {
	$.vOrder.backgroundColor="#4abfe8";
	$.imgOrder.image="/images/btn/other/list.png";
	$.lblOrder.color="#ffffff";
};


function openMyOrder(){
	closeAll();
	if (args!="cartList") {
		var x={title:$.lblCart.text,back:true};
	    Alloy.Globals.Navigator.open("cartList",x); 
		
	}
};

function openOrder(){
	closeAll();
	if (args!="myOrders") {
		var x={title:$.lblOrder.text,back:true};
	    Alloy.Globals.Navigator.open("myOrders",x); 
		
	}
	
};

function openMap(){
	closeAll();
	if (args!="SearchItem") {
	var x={title:$.lblSearch.text,back:true};
	  Alloy.Globals.Navigator.open("SearchItem",x); 
	 }
};

function openMain(){
	if (args!="mainApp") {
		closeAll();
		 for (var i=0; i < mainSec.length; i++) {
                 try{
                 	
                         var winx= mainSec[i];
                         if (winx.id=="mainStore") {
                          	winx.close();
                          	};
                          	 
                 }catch(e){};
                };
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