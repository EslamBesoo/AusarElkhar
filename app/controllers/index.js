//comment eslam

var xs=require("FWService");
var drawer;
Alloy.Globals.Navigator = {

    /**
     * Handle to the Navigation Controller
     */
    navGroup: $.navW,

    open: function(controller, payload){
    xs.open(controller,payload,$.navW,drawer);
    },
    close: function(controller){
        //var win = Alloy.createController(controller,{}).getView();
        controller.close();
    }
    
};


Alloy.Globals.prototype = {
    _write:function(filename,_data){
    
        var data=JSON.stringify(_data);
            var file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/'+filename+'.txt');
            if (!file.exists) {file.createFile();}
            
            file.write('');file.write(data);
    },
    read:function(filename){
        try{
            var data=0;
                var file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/'+filename+'.txt');
                    if (!file.exists) { alert("!file.exists:"+ data);}
                    else{
                    var data = file.read();
                         data=JSON.parse(data);
                //  alert('data:'+data);
                      //data=JSON.parse(data);
                     // alert('data JSON:'+data);
                     
                     }
    }catch(e){};//alert("catch:"+ data+"    "+e.message);};
    
     return data;
    },
    writepost:function(filename,_data){
    
        var data=JSON.stringify(_data);
        //var data=JSON.parse(_data);
            var file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/'+filename+'.txt');
            if (!file.exists) {file.createFile();}
            //file.write('');
            //alert("delete data"+file.read());
            try{
                
                if (file.read().length>0)
                 {file.write(file.read()+","+data);}else{{file.write(data);}};
            }catch(e){
                file.write(data);
                
                
                };
            
            
            //alert("write"+file.read());
            
    },
    del:function(filename){
        var file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/'+filename+'.txt');
         var success = file.deleteFile();
    //   alert(success);
    }
     
};
 /*
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
*/
go2Home();
function doClick(e) {
go2Home();
  // var x={title:L("الدلال للعملاء"),img:"mutooncat"};
   //var win= Alloy.Globals.Navigator.open("home",x); 
}



 //var x={title:L("الدلال للعملاء"),img:"mutooncat"};
 //var win= Alloy.Globals.Navigator.open("home",x); 



function go2Home(){
	
		
		var x={title:"اسر الخير"};
   		Alloy.Globals.Navigator.open("mainApp",x); 
   		//Alloy.Globals.Navigator.open("dealerOrder",x); 

	
};