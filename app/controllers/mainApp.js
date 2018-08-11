// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var FirebaseCore = require('firebase.core');
var fcm = require('firebase.cloudmessaging');
var geo = require('ti.geolocation.helper');
var _Service=require("xhrService");
      _Service.getservice(function(_response){
                         
                  if (_response.success) {
                            try{
                              var responseData= _response.data.Data;
                        
                                    Ti.API.info('category: '+JSON.stringify(responseData));
                                    //$.tbl.appendRow(Alloy.createController('view/advSlider',_response.data.Data.Adv).getView() , true);
                                    for (var i=0; i < responseData.length; i++) {
                                           var rowItem= responseData[i];
                                           var rowController=Alloy.createController('row/rowCategory',rowItem);
                                           $.tbl.appendRow(rowController.getView() , true);
                                    };//End for
                                    responseData=null;
                                    rowItem=null;
                                    rowController=null;
                              
                                    }catch(e){};//if nout found internet not view error 
                        }
                        else{
                              toast("لا يوجد محلات في هذه المنطقة ");
                        };
      },"get_category","itemList",$.mainApp);
try{              
      if (OS_ANDROID) {
            FirebaseCore.configure({
             file: "google-services.json"});
      } else{
           FirebaseCore.configure({
             file: "GoogleService-Info.plist"}); 
            
      };
      //FirebaseAnalytics.resetAnalyticsData();
      //Ti.API.info('App Instance ID: ' + FirebaseAnalytics.appInstanceID);
      
      Ti.API.info('FirebaseCore configure Done');     
      
}catch(ex){
      Ti.API.info('Error FireBase',ex);
}


///////////// FirebaseAnalytics //////////////////////
try{

if (OS_ANDROID) {
      
fcm.createNotificationChannel({
    sound: 'default',
    channelId: 'default',
    channelName: 'General Notifications',
    importance: 'high' //will pop in from the top and make a sound
});
       
Ti.API.info('createNotificationChannel Done android');

};

fcm.addEventListener('didRefreshRegistrationToken', onToken);

// Called when direct messages arrive. Note that these are different from push notifications
fcm.addEventListener('didReceiveMessage', onMessage);

fcm.registerForPushNotifications();

// check if token is already available
if (fcm.fcmToken !== null) {
    Ti.API.info('FCM-Token', fcm.fcmToken);
} else {
    Ti.API.info('Token is empty. Waiting for the token callback ...');
}

// subscribe to topic
fcm.subscribeToTopic('General');

if (OS_IOS) {
      
Ti.App.iOS.addEventListener('usernotificationsettings', function eventUserNotificationSettings() {
  // Remove the event again to prevent duplicate calls through the Firebase API
  Ti.App.iOS.removeEventListener('usernotificationsettings', eventUserNotificationSettings);
  
  // Register for push notifications
  Ti.Network.registerForPushNotifications({
    success: deviceTokenSuccess,
    error: deviceTokenError,
    callback: receivePush // Fired for all kind of notifications (foreground, background & closed)
  });
  
  // Register for Firebase Cloud Messaging
      fcm.registerForPushNotifications();
});

// Register for the notification settings event
Ti.App.iOS.registerUserNotificationSettings({
  types: [
    Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
    Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
    Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
  ]
});
};
Ti.API.info('FirebaseCore configure Done IOS');
}catch(ex){
     Ti.API.info('Error FireBase',ex); 
}
///////////// FirebaseAnalytics //////////////////////
function onToken(e) {
    Ti.API.info('Token', e.fcmToken);
}

function onMessage(e) {
    Ti.API.info('Message', JSON.stringify(e.message));
    Ti.API.info('Message', JSON.stringify(e));
}
function receivePush(e) {
    Ti.API.info('Received push: ' + JSON.stringify(e));
}
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
}
 
function deviceTokenError(e) {
    Ti.API.info('Failed to register for push notifications! ' + e.error);
}

//////////// Location //////////////////////
$.mainApp.addEventListener('open',function(){
   setTimeout(function(){
         geo.getLocation({success: success, error: error});
   },5000); 
});

function success(_location) {
      Ti.App.Properties.setString("userLat",_location.latitude);
     Ti.App.Properties.setString("userLon",_location.longitude);
      Alloy.Globals.userLon = _location.longitude;
      Alloy.Globals.userLat = _location.latitude;
    
            }

function error(_error) {
                  Ti.API.info("Location error: " + _error);
                  
            }
//////////// Location //////////////////////