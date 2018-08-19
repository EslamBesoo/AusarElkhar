// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var geo = require('ti.geolocation.helper');
var onesignal = require('com.williamrijksen.onesignal');
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

if (OS_IOS) {
      onesignal.promptForPushNotificationsWithUserResponse(function(obj) {
        //alert(JSON.stringify(obj));
    });
};
onesignal.addEventListener('notificationOpened', function (evt) {
    //alert(evt);
    if (evt) {
        var title = '';
        var content = '';
        var data = {};

        if (evt.title) {
            title = evt.title;
        }

        if (evt.body) {
            content = evt.body;
        }

        if (evt.additionalData) {
            if (Ti.Platform.osname === 'android') {
                // Android receives it as a JSON string
                data = JSON.parse(evt.additionalData);
            } else {
                data = evt.additionalData;
            }
        }
    }
    Ti.API.info("Notification opened! title: " + title + ', content: ' + content + ', data: ' + evt.additionalData);
});
onesignal.addEventListener('notificationReceived', function(evt) {
    Ti.API.info(' ***** Received! ' + JSON.stringify(evt));
});
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