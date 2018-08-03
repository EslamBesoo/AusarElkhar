// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//infoo
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
   for (var i=0; i < $.subCat.getChildren().length; i++) {
         $.subCat.children[i].children[1].visible=false;
    };
   $.subCat.children[$.form.getCurrentPage()].children[1].visible=true;
};