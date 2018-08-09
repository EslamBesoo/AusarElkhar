// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.data.image;
$.lblTitle.text=args.data.name;
$.lblDesc.text=args.data.details+"\n";
$.lblPrice.text=args.data.price+" "+currancyType;
$.lblCompanyName.text=" اسرة  "+args.data.store_name;

Ti.API.info('ItemDetails: '+JSON.stringify(args.data));

function btnminus(){
	if (parseInt($.lblQty.text)>1) {
		$.lblQty.text=parseInt($.lblQty.text)-1;
	};
	/*	
   	var proqty=$.lblQty.text;
    var dataarr=[proqty,args.id];
    _getdb.updateqtyCart(dataarr);
    _getdb.getCart();
    proqty=null;
    dataarr=null;
    Ti.App.fireEvent("refreshData");*/
};

function btnplus(){
	$.lblQty.text=parseInt($.lblQty.text)+1;
	/*
   	var proqty=$.lblQty.text;
    var dataarr=[proqty,args.id];
    _getdb.updateqtyCart(dataarr);
    _getdb.getCart();
     proqty=null;
    dataarr=null;
     Ti.App.fireEvent("refreshData");*/
};


if (args.userType=="dealer") {
	$.ControlView.visible=true;
};


function delItem(){
	var _getService=require("xhrService");
		var x={
		product_id:args.data.proudct_id,
		//category_id: Ti.App.Properties.getString("catID")
		};
	   _getService.postservice(function(_response){
       // alert(JSON.stringify(_response));
        if (_response.success) {
        		if (_response.data.Flag){
		        	  datax=_response.data.Data; 
		        	  Ti.API.info('delete item by ID :'+JSON.stringify(_response)); 
		            toast("تم حذف المنتج");
		 			  datax=null;
		 			  
		 			  
				}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },"delete_product",$.itemList,x,"itemList");
  
};

function updateItem(){
	 var xx={title:"تعديل البيانات",data:args.data,back:true,userType:"dealer",type:"update"};
	Alloy.Globals.Navigator.open("dealerAddItem",xx); 
};

function add2Cart(){
	var itemID=args.data.proudct_id;
	  var itemName=args.data.name;
	  var itemPrice=args.data.price;
	  var itemImg=args.data.image;
   	  var proqty=$.lblQty.text;
   	  var wight=args.data.name;
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
};
function openWhats(){
	openWhtasApp(args.phone);
};


function CallComp(){
	Titanium.Platform.openURL('tel:'+args.phone);
};
