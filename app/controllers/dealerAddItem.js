// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
//alert(JSON.stringify(args.data));
var myavaCover="";
function reg(){
	if (($.txtTitle.value=="") || ($.txtPrice.value=="") || ($.txtDesc.value=="")  ) {
		toast("من فضلك املاء كل البيانات");
		} else{
			if (args.type=="update") {
			updateItemData("edit_product");
			
			}else{addNewItem("add_product");}
			};
};
function getStore(){
	if (args.type!="update") {
	 var x={
			 	title:$.lblStore.objName,
			 	param:"store",
			 	cont:$.lblStore,
		 	};
   Alloy.createController("popupWin",x).getView().open(); 
 };
};


function getCategory(){ 
	if (($.lblStore.className!=undefined)&&($.lblStore.className!=null)) {
		var x={
			 	title:$.lblCategory.objName,
			 	param:"cat",
			 	cont:$.lblCategory,
			 	cID:$.lblStore.className
			 	
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open();
	} else{
		  toast("حدد المحل اولا");
	};
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
	var x={
		product_id:args.data.proudct_id,
		name:$.txtTitle.value,
		price:$.txtPrice.value,
		details:$.txtDesc.value,
		store_id:$.lblStore.className,
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
           toast("تم اضافة المنتج");
             
             
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
            toast("تم تعديل بيانات المنتج");
             
}else{toast(_response.data.Massage);};//end if Flag
             }else{toast(_response.data.Massage);};//end if
    },url,$.dealerCreateUser,x,"add_product");
    }catch(e){alert(e.message);};
};

if (args.type=="update") {
	$.btnAdd.title=args.title;
	Ti.API.info('Update ITem Data: '+JSON.stringify(args.data));
	$.txtTitle.value=args.data.name;
	$.txtPrice.value=args.data.price;
	$.txtDesc.value=args.data.details;
	$.imgNews.image=args.data.image;
	$.lblStore.className=args.data.store_id;
	$.lblCategory.className=args.data.category_id;
	
};
