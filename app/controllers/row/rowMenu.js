// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//alert(args.title);
$.lbltitle.text=args.title;
$.img.image=args.img;
//rtl($.lbltitle); 
 
function changeColor(){
	$.vx.backgroundColor="#BDBDBD";
	setTimeout(resetColor,5000);
};


function resetColor(){$.vx.backgroundColor="#ffffff";};


if (args.title=="") {
	$.row.height=1;
	$.vx.backgroundColor="#BDBDBD";
};