exports.login=function(win,user,pass)
{
	if (Alloy.Globals.applang=="en") 
		var _msg=" Please check your password or mobile ";
		else
		var _msg=" من فضلك تأكد من صحة كلمة المرور او التليفون ";
	if (OS_IOS) deviceType=2; else	deviceType=1;
var _url="/api/user/client-login";
	var passParam={
		mobile:user,
		password:pass,
		udid:Ti.App.Properties.getString('deviceToken'),
		os:deviceType,//"1"//Ti.Platform.osname
		};
		
		Ti.API.debug(Ti.App.Properties.getString('deviceToken'));
		var _Service=require("xhrService");
		_Service.postservice(function(_response){
				 
		    		if (_response.success) {
					var responseData= _response.data;
					if (_response.data.result) {
						Alloy.Globals.prototype._write("userdata",responseData);
						Alloy.Globals.Navigator.open("category",{title:"Home"});
						 Ti.App.Properties.setString("userid",responseData.id);
						win.close();
					}
					else{
						toast(_msg,win);
					};
				//alert("responseData:"+responseData);
				
				}else{
					//toast("done: err",win);
					//alert("error ");
				};
			},_url,win,passParam);
};
var _check=true;
exports.loginFB=function(win,mycase)
{
 var fb = require('facebook');
		
			
				fb.addEventListener('login',function(e){
					if(e.success){
						 Ti.API.info(e.uid+','+JSON.parse(e.data).name);
 						Ti.App.Properties.setString("id",e.uid);
 						Ti.App.Properties.setString("type","FACEBOOK");
            			Ti.App.Properties.setString("name",JSON.parse(e.data).name);
            			//toast(Ti.App.Properties.getString("id")+","+Ti.App.Properties.getString("name"),this);
            		//alert(Ti.App.Properties.getString("id")+","+Ti.App.Properties.getString("name"),this);
							 if (_check) {
							  if (mycase=="login") { socialLogin("FACEBOOK",win); };
							 	 _check=false;
							};   
				    }else{toast("failure",this);}
							  
							// alert("failure+failure");
							  
							});
				fb.addEventListener('logout',function(e){
							    if(e.success) {
							   // alert("successfully logged out",this); 
							    }else{
							     // toast("failure",this); 
							    }
							});
					fb.initialize();
					if (OS_ANDROID) {
					win.fbProxy = fb.createActivityWorker({lifecycleContainer:win});
					};
  
 
  

};


exports.loginTwitt=function(win,mycase){
	/*var userInfo = require('user_info');
			
			var twitter = require('twitter').Twitter({
			    consumerKey: Alloy.CFG.oauth.twitter.key,
			    consumerSecret: Alloy.CFG.oauth.twitter.secret,
			    accessTokenKey:Ti.App.Properties.getString('accessTokenKey'),// userInfo.get('key'),
			    accessTokenSecret:Ti.App.Properties.getString('accessTokenSecret'),// userInfo.get('secret'),
			   // windowTitle: 'Twitter認証'
			});
			
   twitter.addEventListener('login', function(e) {
//alert("twit Data:  \n"+JSON.stringify(e)+"\n"+e.screen_name);
			    if (e.success) {
			    //	alert("e[screen_name]: "+Ti.App.Properties.getString("twitter_user_id")+"\n"+Ti.App.Properties.getString("twitter_screen_name"));
			    	var tid=Ti.App.Properties.getString("twitter_user_id");
			    	var tname=Ti.App.Properties.getString("twitter_screen_name");
			        var data= [
			            {name: e['screen_name']}, 
			           { uid: e['user_id']},
			           { key: e.accessTokenKey},
			           { secret: e.accessTokenSecret}
			        ];
			        //alert("name"+e['screen_name']);
			        Ti.App.Properties.setString("type",'TWITTER');
			         Ti.App.Properties.setString('id', tid);
			        Ti.App.Properties.setString("name",tname);
			         Ti.App.Properties.setString('accessTokenKey', e.accessTokenKey);
			       Ti.App.Properties.setString('accessTokenSecret', e.accessTokenSecret);
			        if (mycase=="login") {
					 		 socialLogin("TWITTER",win);
					 };
			    } else {
			        toast(e.error,win);
			    }
			});
	twitter.authorize();
					
	*/
};

exports.loginFBAndroid=function(win,mycase){
	socialLogin("FACEBOOK",win);
};
function socialLogin (network,win) {
    //network+="pop"+Ti.App.Properties.getString('deviceToken');
	var deviceType;
	if (OS_IOS) deviceType=2; else	deviceType=1;
  var _url="/api/user/client-social-login";
	var passParam={
		network:network,//"FACEBOOK",
		user_network_id:Ti.App.Properties.getString('id'),
		udid:"123456",//Ti.App.Properties.getString('deviceToken'),
		os:deviceType,
		fullname:Ti.App.Properties.getString("name")
		};
		
		Ti.API.debug(Ti.App.Properties.getString('deviceToken'));
		var _Service=require("xhrService");
		_Service.postservice(function(_response){
				
		    		if (_response.success) {
		    			
					var responseData= _response.data;
				//	alert("response "+network+" login:"+JSON.stringify(responseData));
					//alert(JSON.stringify(responseData));//+"\n"+JSON.stringify(passParam));
					Ti.API.info(JSON.stringify(responseData));
					if(responseData.result){// this person register with social
					     Ti.App.Properties.setString("userid",responseData.id);
						Alloy.Globals.prototype._write("userdata",responseData);	
						Alloy.Globals.Navigator.open("category",{title:"Home"});
					}else{// first login scoial >>>> go to register with scoical chooice
					    Ti.API.info("socialLogin"+JSON.stringify(_response.data));
					    
						//Alloy.Globals.Navigator.open("register",{displayHomeAsUp:true,net:network});
					};
					
				// Ti.App.Properties.setString("userid","10");///from data base or api
				//Alloy.Globals.prototype._write("userdata",responseData);
				//.Globals.Navigator.open("Category",{displayHomeAsUp:false,title:"false"});
				}else{
					toast("error: "+_response.e,win);
					//alert(" err"+_response.e);
				};
				
			
			},_url,win,passParam);
};
