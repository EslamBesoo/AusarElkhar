// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var datax=[];
var productList=[];
 var invoiceData=[];
 var _getService=require("xhrService");
var  totalCart=0;
var dateOffer=new Date();
 var day = dateOffer.getDate();
    var month = dateOffer.getMonth();
    var year = dateOffer.getFullYear();
     var newdate =  day+ "-" +(month+1) + "-" + year;
//alert("UserID: "+userID);

getData();
function getData(){
   datax=[];
   //$.tbl.data=[];
     _getdb.get2Cart(function(_response){
     	 $.lblTotal.text=0;
        // Ti.API.info("win Cart"+JSON.stringify(_response));
        if (_response.data.length>0)  { 
        	if (_response.data) {
        		 datax=_response.data;setData(datax,_response.storData);
        	}else{toast("عربة الشراء فارغة");}; 

            }else{
                Ti.API.info("null"+JSON.stringify(_response.data));
                datax=[];setData(datax);
                $.lblTotal.text=0;
            };//end if
    });
    
  
};

function setData(Grid,listStrot){
      $.tbl.data=[];
     invoiceData=[];
     totalCart=0;
     
      for (var z=0; z < listStrot.length; z++) {
                    var totalStroPrice=0;
                    
       for ( var i=0; i <Grid.length ; i++) {
                     var rowItem= Grid[i];
                      var ItemTotal=rowItem.qty * rowItem.price;
                   Ti.API.info('row item price'+ItemTotal);
                   // Add all list Item to his store
                  if ( listStrot[z].storeID==Grid[i].storeID) {
                  	 //create Json Item List To Post 
                    	 var itemData={proudct_id:rowItem.id,price:rowItem.price,qut:rowItem.qty};
                 		 productList.push(itemData);
                 		 var rowController=Alloy.createController('row/rowCartList',rowItem);
	                     $.tbl.appendRow(rowController.getView(),true);
	                     totalCart+=ItemTotal;// calc total Invoice User
	                     totalStroPrice+=ItemTotal;// calc total Invoice store
                    };  
                };//end for item
                
                // create array list of a Stroe
                var storData={store_id:listStrot[z].storeID,total_price:totalStroPrice,proudcts:productList};
					invoiceData.push(storData);
					productList=[];//clean list Item of a store
                  };//end for stor
                Ti.API.info('cartList Final:'+JSON.stringify(invoiceData));
                
                //beacuse cart bar
                $.tbl.appendRow(Ti.UI.createTableViewRow({height:50}));
               
                  
                
                 Ti.API.info('total item cart:'+totalCart);
                 $.lblTotal.text=totalCart+" "+currancyType;
                 Ti.App.fireEvent("getQty");
                 if (totalCart==0) {
					toast("عربة الشراء فارغة");
					 $.lblTotal.text=0;
					//$.btnSend.color="#BDBDBD";
				}
  };
  
  Ti.App.addEventListener("refreshData",getData);
  


function SendItem(){
	if (totalCart==0) {
		toast("عربة الشراء فارغة");
		 $.lblTotal.text=0;
	} else{
		var netTotlal=totalCart;
	inti();
	};

};


function inti(){
	var x={
			//store_id:1,
			//total_price:totalCart,
			//lat:"89.165165165",//Ti.App.Properties.getString("lat"),
			//lon:"30.565161681",//Ti.App.Properties.getString("long"),
			user_id:1,
			//address:"giza,fasiel,from Mobile test",
			//dilivery_time:newdate,
			//payment_type:0,
			proudct_json:JSON.stringify(invoiceData)
		};	
		//alert(JSON.stringify(x));
		try{
		if ((Ti.App.Properties.getString("userID")==null) || (Ti.App.Properties.getString("userID")=="undefined")){
			 var xx={title:"تسجيل الدخول",data:x,back:true};
 			 Alloy.Globals.Navigator.open("loginUser",xx); 
		}else{
			 x.user_id=Ti.App.Properties.getString("userID");
           closeAll();
		var xx={title:" اتمام عملية الشراء ",back:true,data:x};
		Alloy.Globals.Navigator.open("orderDoneMSG",xx); 
		};
		}catch(e){alert(e.message);};
		
};

function gotoItemDetails(e){
	
};

function sendInvoice(xdata){
	_getService.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('done: '+JSON.stringify(_response));
		    			if (_response.data.Flag){
									
		    			} else{toast(_response.data.Massage);};
		    		    
				}else{
					toast("Serrver Erorr ...");
					Ti.API.info('err: '+JSON.stringify(_response));
				};
			},"add_cart",$.createNewUser,xdata,"add_cart");
			

};
			