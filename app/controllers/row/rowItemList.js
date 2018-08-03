// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text=args.name;
$.lblDesc.text=args.details;
$.lblPrice.text=args.price+" "+currancyType;

  Ti.API.info('args: '+JSON.stringify(args));

function updateQtyValue(e){
	if (args.name=="update") {
	
	var itemID=args.proudct_id;
   	var proqty=$.lblQty.text;
    var dataarr=[proqty,itemID];
    Ti.API.info('args: '+JSON.stringify(dataarr));
    _getdb.updateqtyCart(dataarr);
    _getdb.getCart();
    // update counter item and  qty in shoping cart
    Ti.App.fireEvent("refreshData");
     Ti.App.fireEvent("refreshOrderData");
} else{
	var itemID=args.proudct_id;
	  var itemName=args.name;
	  var itemPrice=args.price;
	  var itemImg=args.image;
   	  var proqty="1";
   	  var wight=args.name;
	  var wightID="1";
    var dataarr=[itemID,itemName,proqty,wightID,wight,itemPrice,itemImg,Ti.App.Properties.getString("storeID")];
    Ti.API.info('data: '+dataarr);
    //delete all item because sent one peoduct in order
   // _getdb.deletfromCArt();
     
    _getdb.addToCart(dataarr,"desc");
    _getdb.getCart();
    dataarr=null;
    // update counter item and  qty in shoping cart
    Ti.App.fireEvent("refreshData");
   // Ti.App.fireEvent("refreshOrderData");
    
   // go2Order();
};


//$.popupItem.close();
};


function go2Details(){
	 var x={title:args.name,back:true,data:args};
   		Alloy.Globals.Navigator.open("itemDetails",x); 
};


///////////// Dealer ///////////////
if (args.userType=="dealer") {
$.cartView.visible=false;
};