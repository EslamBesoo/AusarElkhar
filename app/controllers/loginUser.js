// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
//alert(JSON.stringify(args.data));
function getoPassRec(){
	//var x={title:"استعادة كلمة المرور",img:"mutooncat"};
     //    Alloy.Globals.Navigator.open("passRec",x); 
};



function loginUserData(){
	var x={
		email:$.txtEmail.value,
		password:$.txtPassword.value,
		};
	try{
	   _getService.postservice(function(_response){
       // alert(JSON.stringify(_response));
        Ti.API.info('storeUserData: '+JSON.stringify(_response));
        if (_response.success) {
        		if (_response.data.Flag){
		        	  datax=_response.data.Data;  
		             
		              if (_response.data.user_type=="Store") {
		              	 Ti.App.Properties.setString("userType","Store");
		              	 Ti.API.info('storeData: '+JSON.stringify(datax.stores));
		              	  Ti.App.Properties.setString("userstoreID",datax.user_data.user_id);
		              Ti.App.Properties.setString("userstoreName",datax.user_data.fullname);
		              
		              var x={title:"اسر الخير - ادارة المحلات",data:datax.stores,userType:"dealer"};
         			  Alloy.Globals.Navigator.open("mainStore",x); 
         			  Ti.App.fireEvent("activeDealer");
		              } else{
		              	
		              Ti.App.Properties.setString("userID",datax.user_id);
		              Ti.App.Properties.setString("userName",datax.fullname);
		             
		              Ti.App.Properties.setString("userType","User");
		              closeAll();
		               Ti.App.fireEvent("activeUser");
		              var x={title:"سلة الشراء",back:true};
	    				Alloy.Globals.Navigator.open("cartList",x); 
	    				
						};
		 			  datax=null;
		 			  
		 			  
				}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },"sign_in",$.loginUser,x,"add_cart");
    }catch(e){alert(e.message);};
};


function loginUser(){
	if (($.txtEmail.value=="") || ($.txtPassword.value=="")) {
		toast("من فضلك ادخل كل البيانات");
		} else{loginUserData();};
};

function go2reg(){
	
	var x={title:"تسجيل مستخدم جديد",back:true,data:args.data};
         Alloy.Globals.Navigator.open("createNewUser",x); 
};

function go2regDealer(){
	
	var x={title:"تسجيل تاجر جديد",back:true,data:args.data};
         Alloy.Globals.Navigator.open("dealerCreateUser",x); 
};
 
function sendInvoice(xdata){
	_getService.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('done: '+JSON.stringify(_response));
		    			if (_response.data.Flag){
							go2Done();
									
		    			} else{toast(_response.data.Massage);};
		    		    
				}else{
					toast("Serrver Erorr ...");
					Ti.API.info('err: '+JSON.stringify(_response));
				};
			},"add_cart",$.createNewUser,xdata,"add_cart");
			

};

 if ((Ti.App.Properties.getString("userstoreID")==null) || (Ti.App.Properties.getString("userstoreID")=="undefined")){
			$.btnDealer.visible=true;
		}else{$.btnDealer.visible=false;};