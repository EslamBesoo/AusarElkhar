// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
init();
storName=args.title;
function init(){
	var x={
		store_id:Ti.App.Properties.getString("storeID"),
		category_id: Ti.App.Properties.getString("catID")
		};
	try{
	   _getService.postservice(function(_response){
       // alert(JSON.stringify(_response));
        if (_response.success) {
        		if (_response.data.Flag){
		        	  datax=_response.data.Data; 
		        	  Ti.API.info('User Data from Login :'+JSON.stringify(datax)); 
		             for (var i=0; i < datax.length; i++) {
					  var rowItem= datax[i];
					   var thisView = Alloy.createController("row/rowItemList",rowItem).getView();
					     $.tbl.appendRow(thisView);
					 };
		              //Ti.App.fireEvent("activeUser");
		             
		              //  pushnotifaction
		             /* if (OS_IOS) {
		              	  var xx={title:"عملية الشراء",data:args.data,back:true};
		 			  Alloy.Globals.Navigator.open("paymentType",xx); 
		 			  xx=null;
		              } else{ postUDID();};*/
		               
		            
		 			  datax=null;
		 			  
		 			  
				}else{
					Ti.API.info('list Item '+JSON.stringify(_response));
					toast(_response.data.Massage);
					
					};//end if Flag
             }else{
             	Ti.API.info('list Item '+JSON.stringify(_response));
             	toast(_response.data.Massage);
             	
             	};//end if
    },"get_proudct",$.itemList,x,"itemList");
    }catch(e){alert(e.message);};
};

Ti.API.info('ItemList View: '+JSON.stringify(args));
