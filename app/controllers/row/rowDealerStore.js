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
function updateItem(){
	 var xx={title:"تعديل البيانات",data:args,back:true,userType:"dealer",type:"update"};
	Alloy.Globals.Navigator.open("dealerAddStore",xx); 
};


function delItem(){
	var _getService=require("xhrService");
		var x={
		store_id:args.store_id,
		//category_id: Ti.App.Properties.getString("catID")
		};
	   _getService.postservice(function(_response){
       // alert(JSON.stringify(_response));
        if (_response.success) {
        		if (_response.data.Flag){
		        	  datax=_response.data.Data; 
		        	  Ti.API.info('delete item by ID :'+JSON.stringify(_response)); 
		            toast("تم حذف المحل");
		 			  datax=null;
		 			  
		 			  
				}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },"delete_store",$.itemList,x,"itemList");
  
};
