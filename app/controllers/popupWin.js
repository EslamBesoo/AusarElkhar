// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
$.popupWin.addEventListener('open',function(evt){
                    var activity=$.popupWin.activity;
                    activity.actionBar.hide();
                   
                  returnData();
                });
function closeWin(){
	$.popupWin.close();
};

 var getID;

$.lblTitle.text=args.title;

function intiCountry(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].city_id,title:datax[i].name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_country","allCountries",$.popupWin);
    }catch(e){alert(e.message);};
};

function intiCities(){
	try{
		x={country_id:args.cID};
	   _getService.postservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].city_id,title:datax[i].name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_city",$.popupWin,x,"allCities");
    }catch(e){alert(e.message);};
};




function intiCategory(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].catagory_id,title:datax[i].name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_store_category?store_id="+args.cID,"allSections",$.popupWin);
    }catch(e){alert(e.message);};
};


function intiAllCategory(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].catagory_id,title:datax[i].name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"get_category","allSections",$.popupWin);
    }catch(e){alert(e.message);};
};

function intiStore(){
	try{
		x={user_id: Ti.App.Properties.getString("userstoreID")};
	   _getService.postservice(function(_response){
        
        if (_response.success) {  datax=_response.data.Data;  
             for ( var i=0; i <datax.length ; i++) {
             	     var rowItem={id:datax[i].store_id,title:datax[i].name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                };

             }else{Ti.API.info(JSON.stringify(_response));};
    },"get_my_store",$.popupWin,x,"allTypeAds");
    }catch(e){alert(e.message);};
};

function returnData(){
	if (args.param=="country") {
		 intiCountry();
	}else if(args.param=="city"){
		intiCities();
		
	}else if(args.param=="store"){
		intiStore();
	}else if(args.param=="cat"){
		intiCategory();
	}else if (args.param=="allcat"){
		intiAllCategory();
	};
	
};

function getValue(e){
	args.cont.text=e.row.args.title;
	args.cont.className=e.row.args.id;
	
	//alert("value= "+args.cont.className);
	
	if (args.param=="country") {
		countryID=e.row.args.id;
	}else if(args.param=="type"){
		typeID=e.row.args.id;
	}else if(args.param=="typeAds"){
		advTypeID=e.row.args.id;
	}else if(args.param=="section"){
		sectionID=e.row.args.id;
	}else{
		cityID=e.row.args.id;
	};
	$.popupWin.close();
};
