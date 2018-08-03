// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
//alert(JSON.stringify(args.data));
var myavaCover="";
function reg(){
	if (($.txtEmail.value=="") || ($.txtPhone.value=="") || ($.txtUser.value=="") || ($.txtPassword.value=="") ) {
		toast("من فضلك املاء كل البيانات");
		} else{postUserData();};
};
function getCity(){
	 var x={
			 	title:$.lblArea.objName,
			 	param:"city",
			 	cont:$.lblArea,
			 	cID:$.lblCity.className,
		 	};
   Alloy.createController("popupWin",x).getView().open(); 
};


function getCountry(){ 
	 var x={
			 	title:$.lblCity.objName,
			 	param:"country",
			 	cont:$.lblCity,
			 	
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open(); 
};



function postUserData(){
	var x={
		email:$.txtEmail.value,
		phone:$.txtPhone.value,
		fullname:$.txtUser.value,
		password:$.txtPassword.value,
		city_id:$.lblArea.className,
		country_id:$.lblCity.className,
		address:$.txtAddress.value,
		number_id:$.txtNo.value,
		image_id:myavaCover
		};
	try{
	   _getService.postservice(function(_response){
        //alert(JSON.stringify(_response));
        Ti.API.info('storeUserData: '+JSON.stringify(_response));
        if (_response.success) { 
        	if (_response.data.Flag){
        	 datax=_response.data.Data;  
             Ti.App.Properties.setString("userstoreID",datax.user_id);
		     Ti.App.Properties.setString("userstoreName",datax.fullname);
             Ti.App.Properties.setString("userType","Store");
             
              var x={title:"اسر الخير - ادارة المحلات",back:true,data:datax.stores,userType:"dealer"};
         			  Alloy.Globals.Navigator.open("mainStore",x); 
            // Ti.App.fireEvent("activeUser");
             // args.data.user_id=Ti.App.Properties.getString("dealerID");
             //sendInvoice(args.data);
             
             
}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },"sign_up_traid",$.dealerCreateUser,x,"add_cart");
    }catch(e){alert(e.message);};
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


function openOption(){
	var opt=[];
	opt[0]="اختر من الكاميرا";
	opt[1]="اختر من الاستوديو";
	$.options.setOptions(opt);
		$.options.show();
};


function optionDialogClicked(e) {
	Ti.API.info('data: '+JSON.stringify(e));
		if ([e.index]==0) 
			{
				if (Ti.Media.hasCameraPermissions()) {
				openCam();
				} else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success) {
                openCam();
            } else {
                alert('You denied permission');
            }
        });
				}
			}else{openGalImg();};
}

function openCam(){
	Ti.Media.showCamera({
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
    success: function (e) {
    	
    	  
                	 	 myavaCover=e.media;
                	 	$.imgNews.image=myavaCover; 
                	
    },
    error: function (e) {
        Ti.API.error(JSON.stringify(e));
    }
});
};


function openGalImg(){
 //obtain an image from the gallery
        Titanium.Media.openPhotoGallery({
            success:function(e)
            {
                if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                { 
                	 
                	 	 myavaCover=e.media;
                	 	$.imgNews.image=myavaCover; 
                	

                                }   
                            },
                           
    error: function (e) {
        Ti.API.info(JSON.stringify(e));
    },
                            cancel:function()
                            {  }
        });
};


if (OS_ANDROID) {
//permissions photo gallery
var permissions = ['android.permission.CAMERA', 'android.permission.READ_EXTERNAL_STORAGE'];
Ti.Android.requestPermissions(permissions, function(e) {
    if (e.success) {
        Ti.API.info("SUCCESS");
    } else {
        Ti.API.info("ERROR: " + e.error);
    }
});
};
