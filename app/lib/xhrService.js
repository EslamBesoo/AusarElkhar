exports.getservice=function(_callBack,_url,fileName,win)
{
	_url=Alloy.Globals.appURl+_url;
	Ti.API.info('url: '+_url);
Alloy.Globals.loading.show(L("Loading ...."),false);
 if(checkInternetConnection()){
 	
	var xhr = Ti.Network.createHTTPClient({
		
		onload : function(e) {
				Ti.API.debug(this.resposeText);
				try{ Alloy.Globals.loading.hide();}catch(e){};
				Ti.API.info(JSON.parse(this.responseText));
			//alert('res data' +JSON.stringify(this.responseText));
				Alloy.Globals.prototype._write(fileName,JSON.parse(this.responseText));
				 var data=Alloy.Globals.prototype.read(fileName);
    			 //alert("save data: "+this.responseText);
					_callBack({
						success:JSON.parse(this.responseText).Flag,
						data:JSON.parse(this.responseText)
					//	data:JSON.parse(data)
					});
				},
		onerror : function(e) {
				 try{ Alloy.Globals.loading.hide();}catch(e){};
				_callBack({
							success:false,
							e:e.error
						});
					toast("حدث خطأ في الاتصال يرجي المحاولة لاحقا");
					Ti.API.info(JSON.stringify(e));
				},
					timeout:10000,
					
				});
				

	
	// Send the request for binary data.
	xhr.open('GET', _url);
	xhr.send();
	
	
	  } else{
	  	
    	//cachData(fileName,_callBack);
    	conn(win);
          
           
      }	; 
      
      
      function checkInternetConnection(){return Ti.Network.online ? true : false;};
    //  function checkInternetConnection(){return Ti.Network.online ? true : false;};
};


exports.postservice=function(_callBack,_url,win,myPostData,fileName)
{
//	alert(myPostData);
	_url=Alloy.Globals.appURl+_url;
	Ti.API.info('url: '+_url);
Alloy.Globals.loading.show(L("Loading ...."),false);
 if(checkInternetConnection()){
            //Do the server call to get info
     
	var url="http://app.monsbaty.com/en/api/cats/get-subcat";
	// Create an HTTPClient.
	var xhr = Ti.Network.createHTTPClient({
		onreadystatechange : function() {
						//alert(this.readyState);
						if (this.readyState == 4) {
						//	alert('res data' +JSON.stringify(this.responseText));
						
							//xhr = null;
						}
				},
		onload : function(e) {
				Ti.API.debug(this.resposeText);
				try{ Alloy.Globals.loading.hide();}catch(e){};
				Alloy.Globals.prototype._write(fileName,JSON.parse(this.responseText));
				_callBack({
					success:true,
						data:JSON.parse(this.responseText)
				});
				},
				onerror : function(e) {
					try{ Alloy.Globals.loading.hide();}catch(e){};
					
					_callBack({
							success:false,
							e:e.error
						});
					//toast("حدث خطأ في الاتصال يرجي المحاولة لاحقا",win);
					toast(e.error);
				},
					timeout:10000
				});
				

	
	// Send the request for binary data.
	xhr.open('POST', _url);
	//xhr.setRequestHeader("content-type", "application/json");
	Ti.API.info("myPostData:"+JSON.stringify(myPostData));
	//xhr.send(myPostData);
		//xhr.setRequestHeader("Content-Type","application/form-data");
	//xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	xhr.send(myPostData);
//alert("myPostData:"+JSON.stringify(myPostData));
//xhr.send({ cat: 48});
	//xhr.send("ehab");
	  }
    else{
    	//cachData(fileName,_callBack);
    	conn(win);
      }	; 
      function checkInternetConnection(){return Ti.Network.online ? true : false;};
    //  function checkInternetConnection(){return Ti.Network.online ? true : false;};
};


exports.postserviceImg=function(_callBack,_url,win,myPostData,fileName)
{

	_url=Alloy.Globals.appURl+_url;
Alloy.Globals.loading.show(L("Loading ...."),false);
 if(checkInternetConnection()){

	// Create an HTTPClient.
	var xhr = Ti.Network.createHTTPClient({
		onreadystatechange : function() {
						//alert(this.readyState);
						if (this.readyState == 4) {
							//alert('res data' +JSON.stringify(this.responseText));
						
							//xhr = null;
						}
				},
		onload : function(e) {
				Ti.API.debug(this.resposeText);
				try{ Alloy.Globals.loading.hide();}catch(e){};
				//alert("resposeText:"+this.resposeText);
				Alloy.Globals.prototype._write(fileName,JSON.parse(this.responseText));
				_callBack({
					success:true,
				   data:JSON.parse(this.responseText)
				});
				},
				onerror : function(e) {
					try{ Alloy.Globals.loading.hide();}catch(e){};
					Ti.API.info('upload image err: '+JSON.stringify(e));
					_callBack({
							success:false,
							e:e.error
						});
					toast("حدث خطأ في الاتصال يرجي المحاولة لاحقا");
					//alert(" error Image: "+JSON.stringify(e.error));
				},
					timeout:10000
				});
				
	

	xhr.open('POST', _url);
	
	xhr.setRequestHeader("enctype", "multipart/form-data");
   // xhr.setRequestHeader("ContentType", "image/jpeg");
  // xhr.setRequestHeader("Content-Type","application/form-data");
	xhr.send(myPostData);
	//alert("myPostData profile:"+JSON.stringify(myPostData));
	  }
    else{
    	conn(win);
      // cachData(fileName,_callBack);
           
      }	; 
      
      
      function checkInternetConnection(){return Ti.Network.online ? true : false;};
    //  function checkInternetConnection(){return Ti.Network.online ? true : false;};
   
};


 function cachData(fileName,_callBack){
 	try{ Alloy.Globals.loading.hide();}catch(e){};
    	 try{
    	 var data=Alloy.Globals.prototype.read(fileName);
    	  // toast(JSON.stringify(data).length,win);
    	   
    	     
    	      	if (JSON.stringify(data).length<=0) {
            		 if (Ti.App.Properties.getString("SETTING_LANGUAGE") =="en") {
		           toast('توجد مشكلة في الاتصال بالإنترنت');
		           } else{toast('توجد مشكلة في الاتصال بالإنترنت');}; 
            }else{
            	_callBack({
					success:true,
					data:data
				});
            };
    	      }catch(e){
    	      	if (checkInternetConnection()) {} else{
    	      	 if (Ti.App.Properties.getString("SETTING_LANGUAGE") =="en") {
		            toast('توجد مشكلة في الاتصال بالإنترنت');
		           } else{toast('توجد مشكلة في الاتصال بالإنترنت');}; 
		           };
    	      };
    };//end cach Function

function conn(win){
	if (win.id!="newHome") { 
	try{ Alloy.Globals.loading.hide();}catch(e){};
	win.add(Alloy.createController("connNet",win).getView());
	};
};
 function checkInternetConnection(){return Ti.Network.online ? true : false;};
