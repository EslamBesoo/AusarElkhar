// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblDesc.text=args.country_name+" - "+args.city_name;


function getStore(){
	storName=args.name;
	 var x={title:args.name,back:true,userType:"dealer",storeID:args.store_id};
   		Alloy.Globals.Navigator.open("dealerItemStore",x); 
};
