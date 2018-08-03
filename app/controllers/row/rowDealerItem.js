// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblDesc.text=args.details;
$.lblPrice.text=args.price+" "+currancyType;

  Ti.API.info('args: '+JSON.stringify(args));



function go2Details(){
	 var x={title:args.name,back:true,data:args,userType:"dealer",storName:"test"};
   		Alloy.Globals.Navigator.open("itemDetails",x); 
};
