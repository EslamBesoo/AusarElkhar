// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
 var options=Ti.UI.createOptionDialog();
var optionData = [];
//alert(JSON.stringify(args.pramTitle));
if (args.type=="url") {
wwwUrl(args.pramTitle);
} else{
    listPhone(args.param);
};

options.title=args.title;
options.addEventListener("",optionDialogClicked);
function optionDialogClicked(e) {
    //e.index;
    //optionData[e.index];
    if (args.type=="url") {
        Titanium.Platform.openURL(args.param[e.index]);
    }else{
        
    //alert(JSON.stringify(e));
//  alert(optionData[optionData.length+1]);
        if (optionData[e.index]!=undefined && (optionData[e.index]!=L("_txtbtncancel") && optionData[optionData.length+1]!="")) 
            {Ti.Platform.openURL('tel:'+optionData[e.index]);   }
    };
}

function wwwUrl(urls){
var x=0;
    for (var i=0; i < urls.length; i++) {
     optionData[i]=urls[i];
     
     x++;
    };
    if (OS_IOS) {
    optionData[x+1]=L("_txtbtncancel")  ;
    options.setCancel(x+1);
    };
    options.setOptions(optionData);
    options.show();
};

function listPhone(phones){
    var x=0;
    optionData[0]=args.firstPhone;
    for (var i=0; i < phones.length; i++) {
     optionData[i+1]=phones[i];
      x++;
    };
    if (OS_IOS) {
            optionData[x+1]=L("_txtbtncancel")  ;
            options.setCancel(x+1);
            };
    options.setOptions(optionData);
    options.show();
};
