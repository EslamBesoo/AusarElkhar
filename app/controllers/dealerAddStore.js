// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
//alert(JSON.stringify(args.data));
var geo = require('ti.geolocation.helper');
var myavaCover="";
var cat=[];

if (Ti.App.Properties.getString("userLat") == null) {
      setTimeout(function(){
         geo.getLocation({success: success, error: error});
   },1000);
};
function success(_location) {
      Ti.App.Properties.setString("userLat",_location.latitude);
     Ti.App.Properties.setString("userLon",_location.longitude);
      Alloy.Globals.userLon = _location.longitude;
      Alloy.Globals.userLat = _location.latitude;
    
            }
Ti.App.addEventListener("checkPermission",function(e){
      var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
      Ti.API.info('Ti.Geolocation.hasLocationPermissions', hasLocationPermissions);

      if (hasLocationPermissions) {
            
      }else{
            error();
      }
});
function error() {
                  var dialog = Ti.UI.createAlertDialog({
    //cancel: 1,
    buttonNames: ['Confirm'],
    message: "You must Grant Location Permission to add a Store !",
    title: "Sorry , Permission Denied"
  });
  dialog.addEventListener('click', function(e) {
    if (e.index === e.source.cancel) {
      //Ti.API.info('The cancel button was clicked');
    }else{
          $.dealerAddStore.close(); 
    }
    
  });
  dialog.show();
                  
            }

function reg(){
	if (($.txtTitle.value=="") || ($.txtPrice.value=="") || ($.txtDesc.value=="")  ) {
		toast("من فضلك املاء كل البيانات");
		} else{
			if (args.type=="update") {
			updateItemData("edit_store");
			
			}else{addNewItem("add_store");}
		};
};

function getCategory(){ 
	 var x={
			 	title:$.lblCategory.objName,
			 	param:"allcat",
			 	cont:$.lblCategory,
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open(); 
};

function getCity(){
	if (($.lblCity.className!=undefined)&&($.lblCity.className!="null")) {
	 var x={
			 	title:$.lblArea.objName,
			 	param:"city",
			 	cont:$.lblArea,
			 	cID:$.lblCity.className,
		 	};
   Alloy.createController("popupWin",x).getView().open(); 
   } else{
		  toast("حدد البلد اولا");
	};
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

 


function addNewItem(url){
	
	cat.push[$.lblCategory.className];
	var x={
		name:$.txtTitle.value,
		lat:Ti.App.Properties.getString("userLat"),
		lon:Ti.App.Properties.getString("userLon"),
		phone:$.txtPrice.value,
		address:$.txtAddress.value,
		note:$.txtDesc.value,
		user_id:Ti.App.Properties.getString("userstoreID"),
		category_id:cat,//[3,2,1],//$.lblCategory.className,
		country_id:$.lblCity.className,
		city_id:$.lblArea.className,
		img:$.imgNews.toImage()
		};
	try{
	   _getService.postservice(function(_response){
        //alert(JSON.stringify(_response));
        Ti.API.info('storeUserData: '+JSON.stringify(_response));
        if (_response.success) { 
        	if (_response.data.Flag){
        	 datax=_response.data.Data;  
            Ti.App.fireEvent("resetStorData");
              toast("تم اضافة المحل");
             
			}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },url,$.dealerCreateUser,x,"add_product");
    }catch(e){alert(e.message);};
};


function updateItemData(url){
	var x={
		product_id:args.data.proudct_id,
		name:$.txtTitle.value,
		price:$.txtPrice.value,
		details:$.txtDesc.value,
		//store_id:$.lblStore.className,
		category_id:$.lblCategory.className,
		img:$.imgNews.toImage()
		};
	try{
	   _getService.postservice(function(_response){
        //alert(JSON.stringify(_response));
        Ti.API.info('storeUserData: '+JSON.stringify(_response));
        if (_response.success) { 
        	if (_response.data.Flag){
        	 datax=_response.data.Data;  
            Ti.App.fireEvent("resetStorData");
             toast("تم تعديل بيانات المحل");
             
}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },url,$.dealerCreateUser,x,"add_product");
    }catch(e){alert(e.message);};
};

if (args.type=="update") {
	$.btnAdd.title=args.title;
	Ti.API.info('Update ITem Data: '+JSON.stringify(args));
	$.txtTitle.value=args.data.name;
	$.txtPrice.value=args.data.phone;
	$.txtAddress.value=args.data.address;
	$.imgNews.image=args.data.image;
	$.lblCity.className=args.data.country_id;
	$.lblCity.text=args.data.country_name;
	$.txtPrice.editable=false;
	$.lblArea.className=args.data.city_id;
	$.lblArea.text=args.data.city_name;
	//$.lblCategory.className=args.data.category_id;
	//$.lblCategory.className=args.data.category_id;
	
};
//getCategry();
function getCategry(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem=datax[i];
                     var rowController=Alloy.createController('row/rowDepartment',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_category","allSections",$.dealerAddStore);
    }catch(e){alert(e.message);};
};


function setCat(e){
	Ti.API.info('rew selected: '+JSON.stringify(e.row));
};

