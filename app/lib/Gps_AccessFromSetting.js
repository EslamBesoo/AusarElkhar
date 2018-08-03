exports._checkGPS=function()
{
	
	test();
	function test(){
			if (OS_ANDROID){
				var alertDlg = Titanium.UI.createAlertDialog({
				    title:'Aldallaal Provider Track GPS', 
				    message:"يجب السماح للتطبيق بالحصول علي صلاحية الــ GPS",//'GPS is OFF.  Enable it in Settings.',
				    buttonNames: ["الغاء","فتح الاعدادات"]
				});
				alertDlg.cancel = 0;
		
				alertDlg.addEventListener('click', function(e){
				    if(!e.cancel) {
				        //open up the settings page
				        
				        var settingsIntent = Titanium.Android.createIntent({
				            action: 'android.settings.LOCATION_SOURCE_SETTINGS'
				        });
				        Ti.Android.currentActivity.startActivity(settingsIntent);
				       
				        xxx();
				    }
				    else {
				        
				    }
				});
				
		alertDlg.show();
		}else{toast(L("gps_msg"));};//ios platform
		
		
};
		
		
		
		function xxx(){
				if (OS_ANDROID && Ti.Platform.version >= '6.0.0') {
					// The first argument is required on iOS and ignored on other platforms
			var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
			Ti.API.info('Ti.Geolocatison.hasLocationPermissions', hasLocationPermissions);
			
			if (hasLocationPermissions) {
			    return alert('You already have permission.');
			}
			
			Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
			    Ti.API.info('Ti.Geolocation.requestLocationPermissions', e);
			
			    if (e.success) {
			
			        // Instead, probably call the same method you call if hasLocationPermissions() is true
			        alert('You granted permission.');
			
			    } else if (OS_ANDROID) {
			        alert('You denied permission for now, forever or the dialog did not show at all because it you denied forever before.');
			
			    } else {
			
			        // We already check AUTHORIZATION_DENIED earlier so we can be sure it was denied now and not before
			        Ti.UI.createAlertDialog({
			            title: 'You denied permission.',
			
			            // We also end up here if the NSLocationAlwaysUsageDescription is missing from tiapp.xml in which case e.error will say so
			            message: e.error
			        }).show();
			    }
			});
			};// android march sdk morthan 6.0.0
			};

};