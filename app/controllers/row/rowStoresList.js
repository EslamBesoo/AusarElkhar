// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblCountry.text=args.country_name+" - "+args.city_name;


if (args.is_close==1) {
	$.imgStatus.image="/images/store/loc.png";
};


if (args.reliable==0) {
	$.imgRelable.visible=false;
};

function getStoreItem(){
	if (args.is_close==0) {
	 Ti.App.Properties.setString("storeID",args.store_id);
	 var x={title:args.name,back:true,data:args};
   		Alloy.Globals.Navigator.open("CompanyProile",x); 
   	}else{
   		toast("المحل مغلق الآن");
   	};
};


function openWhats(){
	if (args.is_close==0) {
	openWhtasApp(args.phone);
		}else{
   		toast("المحل مغلق الآن");
   	};
};


function CallComp(){
	if (args.is_close==0) {
	Titanium.Platform.openURL('tel:'+args.phone);
		}else{
   		toast("المحل مغلق الآن");
   	};
};

if (OS_IOS) {
	var w=Ti.Platform.displayCaps.platformWidth;
	$.rowStoresList.width=(w*.47);
};