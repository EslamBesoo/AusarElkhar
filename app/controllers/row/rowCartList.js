// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var x=[];
//var _getdb=require("db");
$.lblname.text=args.name;
$.proimg.image=args.imgUrl;
var _tot=parseInt(args.qty) * parseInt(args.price);
$.lblprice.text=args.price;
$.lblQty.text=args.qty;
//$.lblunitNmae.text=" "+args.unitNmae;
Ti.API.info('data Cart: '+JSON.stringify(args));
//$.lblTotal.text=_tot;
$.row.args=args;


//pass Curancy Type
$.curType.text=currancyType;
//$.totType.text=currancyType;

function DelProduct(){
    _getdb.del(args.id);
   // _getdb.deletfromCArt();
    Ti.App.fireEvent("refreshData");
};

function btnminus(){
	if (parseInt($.lblQty.text)>1) {
		$.lblQty.text=parseInt($.lblQty.text)-1;
	};
		
   	var proqty=$.lblQty.text;
    var dataarr=[proqty,args.id];
    _getdb.updateqtyCart(dataarr);
    _getdb.getCart();
    proqty=null;
    dataarr=null;
    Ti.App.fireEvent("refreshData");
};

function btnplus(){
	$.lblQty.text=parseInt($.lblQty.text)+1;
	
   	var proqty=$.lblQty.text;
    var dataarr=[proqty,args.id];
    _getdb.updateqtyCart(dataarr);
    _getdb.getCart();
     proqty=null;
    dataarr=null;
     Ti.App.fireEvent("refreshData");
};
