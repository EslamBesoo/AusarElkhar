// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblCountry.text=args.country_name+" - "+args.city_name;



function openWhats(){
	openWhtasApp(args.phone);
};


function CallComp(){
	Titanium.Platform.openURL('tel:'+args.phone);
};
