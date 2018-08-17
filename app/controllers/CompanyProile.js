// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.form.addView(Alloy.createController("view/companyProfileView",args.data).getView());
$.form.addView(Alloy.createController("view/itemLIstView",args).getView());

function xme(x){
    for (var i=0; i < $.subCat.getChildren().length; i++) {
         $.subCat.children[i].children[1].visible=false;
    };
    $.subCat.children[x.source.objName].children[1].visible=true;
    $.form.scrollToView(x.source.objName);
    
};
 $.form.scrollToView(1);
 
function test(e){
	if ($.form.getCurrentPage()==1) {
		if (OS_IOS) {
			$.CompanyProile.children[2].bottom=0;
		}else{
		$.CompanyProile.children[0].children[3].bottom=0;
		};
	}else{
		if (OS_IOS) {
			$.CompanyProile.children[2].bottom=-100;
		} else{
			$.CompanyProile.children[0].children[3].bottom=-100;
		};
		
	};
	Ti.API.info(JSON.stringify($.CompanyProile.children[2].id));
   for (var i=0; i < $.subCat.getChildren().length; i++) {
         $.subCat.children[i].children[1].visible=false;
    };
   $.subCat.children[$.form.getCurrentPage()].children[1].visible=true;
};


