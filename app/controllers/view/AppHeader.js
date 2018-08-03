// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


//rtl($.iconHeader);

Ti.App.addEventListener("getCountItem",getCountitem);
getCountitem(); 
function getCountitem(){
	//animation.shake($.viewCart);
    $.lblCount.text=" "+pkQty+" ";
    if (pkQty>0) {$.lblCount.visible=true;
        }else{$.lblCount.visible=false;};
        
};


