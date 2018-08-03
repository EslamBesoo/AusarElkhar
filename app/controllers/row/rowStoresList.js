// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblCountry.text=args.country_name+" - "+args.city_name;

function getStoreItem(){
	 Ti.App.Properties.setString("storeID",args.store_id);
	 var x={title:args.name,back:true,data:args};
   		Alloy.Globals.Navigator.open("CompanyProile",x); 
};


function openWhats(){
	openWhtasApp(args.phone);
};


function CallComp(){
	Titanium.Platform.openURL('tel:'+args.phone);
};

if (OS_IOS) {
	var w=Ti.Platform.displayCaps.platformWidth;
	$.rowStoresList.width=(w*.47);
};