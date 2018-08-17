// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");

 Ti.App.Properties.setString("catID",args.id);


	 Ti.App.Properties.getString("userLat");
     Ti.App.Properties.getString("userLon");
inti();
var urlStore="get_store?category_id="+args.id;
function getUrl(){
	Ti.API.info('location lat: '+Ti.App.Properties.getString("userLat"));
	if (Ti.App.Properties.getString("userLat")==null) {
		toast("من فضلك افتح الموقع للوصول للأسر الاقرب اليك");
		urlStore="get_store?category_id="+args.id;
		
	} else{urlStore="get_store?category_id="+args.id+"&lat="+Ti.App.Properties.getString("userLat")+"&lng="+Ti.App.Properties.getString("userLon");};
};


function inti(){
getUrl();
    _getService.getservice(function(_response){
        if (_response.success) {  datax=_response.data.Data;  
        	setData(datax);
 Ti.API.info(JSON.stringify(_response));
             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },urlStore,"storesList",$.storesList);
};//end inti


function setData(Grid){
	$.tbl.data=[];
        var yGrid = Grid.length /2;
        var cellIndex = 0;
        Ti.API.info(JSON.stringify(Grid));
           for (var y=0; y<yGrid; y++){
            // 120+(2*10)
            var thisRow = Ti.UI.createTableViewRow({
                className: "grid",
                layout: "horizontal",
                height:210,
               // backgroundColor:"red"
                
               });
               //rtl(thisRow);
               
           for (var x=0; x<2; x++){
                 var rowItem= Grid[cellIndex];
                var thisView = Alloy.createController("row/rowStoresList",rowItem).getView();
                if (cellIndex != Grid.length) {
                    thisRow.add(thisView);
                    cellIndex++;     
                };// end if                 
            };//end for
               $.tbl.appendRow(thisRow);
            
           };//end for
           Grid=null;
		   rowItem=null;
		   thisRow=null;
		   thisView=null;
    };