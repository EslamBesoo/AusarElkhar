// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lbltitle.text=args.name;

function go2Store(){
	var x={title:args.name,id:args.catagory_id,back:true};
   		Alloy.Globals.Navigator.open("storesList",x); 
};
