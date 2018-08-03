// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();

var totalCart=0;
var currancyType=" "+"ريال";
var companyID;
var companyName;
var pkQty=0;
var appSec=[];
var mainSec=[];
var resetlist=[];
var OPEN_MODE_NONE;
 Alloy.Globals.fontType="JF-Flat-regular";
var countryId,countryName;
var cityID,cityName;
var typeId,typeName;
var typeAdvId,typeAdvName;
var sectionId,sectionName;

var _getdb=require("db");
_getdb.createCarttbl();
 _getdb.getCart();
 
var iosdrawer=require("iosDrawer");
var androdrawer=require("androMenu");
//Alloy.Globals.Map = require('ti.map'); 
var animation = require('/alloy/animation');

var iosToast=require("iosToast");
if( OS_ANDROID ) { 
  Alloy.Globals.Android = { 
    "Api" : Ti.Platform.Android.API_LEVEL
  };
}else{
	Ti.App.forceSplashAsSnapshot = true;
};


Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
Alloy.Globals.hOff=false;

Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
Alloy.Globals.appURl="https://www.osarelkhair.com/new/API/Client/"; 
Alloy.Globals.imagePath="http://aldallaal.com/scripts/timthumb.php?src=http://aldallaal.com/images/";   

 Ti.App.Properties.setString("SETTING_LANGUAGE","ar");
  Ti.Locale.setLanguage("ar");
  
 /*
 Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
  if (Alloy.Globals.applang=="en") {Alloy.Globals.isRTL="left";
}else if (Alloy.Globals.applang=="ar"){Alloy.Globals.isRTL="right";};


				
					if (Alloy.Globals.applang == null) {
						Ti.API.info('App lang= '+Alloy.Globals.applang);
						Ti.App.Properties.setString("SETTING_LANGUAGE","ar");
                        Ti.Locale.setLanguage("ar");
                        Ti.API.info(Alloy.Globals.applang+'/ar-right');
                       // Alloy.Globals.isRTL = Ti.Locale.currentLanguage === 'ar';
                        Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
                        Alloy.Globals.isRTL="right";
					} else{
						Ti.API.info('App lang= '+Alloy.Globals.applang);
						Ti.App.Properties.setString("SETTING_LANGUAGE","en");
						 Ti.Locale.setLanguage(Ti.App.Properties.getString("SETTING_LANGUAGE"));
                           Ti.API.info(Alloy.Globals.applang+'/en-left');
					  
						};
  */

function toast(title,win){
    if (OS_ANDROID) {
            Alloy.createWidget("com.mcongrove.toast", null, {
            text: title,
            duration: 2000,
            view: win
            });
    }else{
            iosToast.show(title);
    };
};


function sharedata(e,_status){
    
    if (OS_ANDROID) {
    var directory = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'pictures/shareing');
    !directory.exists() && directory.createDirectory();
    
      var fileToShare = Ti.Filesystem.getFile(directory.resolve(), 'aldallal.jpg');
    fileToShare.write(e.toImage());   
    _status=_status+"\n تحميل التطبيق من "+"https://play.google.com/store/apps/details?id=com.digitaldesign.aldallaal";
    }else{
    var img = e.toImage();
        fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'aldallal.jpg');
         fileToShare.write(e.toImage());  
   // fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'tempimage.jpg');
};
   // write the blob image to created file
Ti.API.info('share: '+_status);
    var socialWidget=Alloy.createWidget('com.alcoapps.socialshare');
    socialWidget.share({
        status:_status+"\n تحميل التطبيق من "+"https://play.google.com/store/apps/details?id=com.digitaldesign.aldallaal",
        //androidDialogTitle:"Share With",
        image:fileToShare.nativePath,
        androidDialogTitle  :"الدلال",
        });
}


function rtl(controll){
 controll.transform=Ti.UI.create2DMatrix().scale(-1,1);	
};


function _backButton(win){
	if (OS_ANDROID) {
		win.addEventListener('android:back', function(e) {
					if (win.id=="newHome") {
						alert("home");
					} else{
						alert(win.id);
					};
					//win.addEventListener('android:back', function(e) {var activity = Titanium.Android.currentActivity; activity.finish();});
					//win.addEventListener('android:back', function(){win.close(Titanium.UI.Android);});
				//var	toolbar = (Toolbar) rootView.findViewById(R.id.my_awesome_toolbar);	
			});		
					};
		
			};
function htm(content){
				var htmlPage="<html><header> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"></header><body>"+content+"\n"+"</body></html>";
					return htmlPage;
			};



function htmImg(urlImg){ 
	var html="<img style=\"-webkit-user-select: none;margin-top:40%; width:100%;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;background-image: linear-gradient(45deg, #900606 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);\" src=\""+ urlImg +"\">";
	return html;
}



function getToggel(menu){
	if (Ti.Locale.currentLanguage=="ar") {
		Ti.API.info('App lang Ar ='+Ti.Locale.currentLanguage);
		//menu.toggleRight();
menu.toggleLeft();	
	} else{
		menu.toggleLeft();	
	};
};

// تقريب رقم هشري
var myNamespace = {};

myNamespace.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};


function go2Done(){
	_getdb.deletfromCArt();
	closeAll();
	var x={title:" تم ارسال الطلب ",back:true};
    Alloy.Globals.Navigator.open("orderDoneMSG",x); 
};

 function closeAll(){
       //  if (OS_ANDROID) {
        for (var i=0; i < appSec.length; i++) {
                 try{
                   
                         var winx= appSec[i];
                        
                          	winx.close();
                        
                          
                    
                 }catch(e){};
                };
                
               //  };
    };
    

function go2Done(){
	_getdb.deletfromCArt();
	closeAll();
	var x={title:" تم ارسال الطلب ",back:true};
    Alloy.Globals.Navigator.open("orderDoneMSG",x); 
};


function openWhtasApp(msgBody){
	var whatsappUrl = encodeURI('whatsapp://send?phone=+20' + msgBody);
    if (OS_IOS) {
        if (Ti.Platform.canOpenURL(whatsappUrl)) {
            Ti.Platform.openURL(whatsappUrl);
        } else {
            Ti.Platform.openURL("https://itunes.apple.com/ae/app/whatsapp-messenger/id310633997?mt=8");
        }
    } else {
        var isSuccess = Ti.Platform.openURL(whatsappUrl);
        if (!isSuccess) {
            Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.whatsapp&hl=en");
        }
    }
};
