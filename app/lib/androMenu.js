exports._menu=function(navW,_menu){
var drawer = Ti.UI.Android.createDrawerLayout({
    centerView: navW,
});

/*if (Ti.Locale.currentLanguage=="ar") {
	drawer.setRightView(Alloy.createController("LeftMenu",drawer).getView());
	Ti.API.info('drawer Right');
}else{
	drawer.setLeftView(Alloy.createController("LeftMenu",drawer).getView());
	Ti.API.info('drawer Left');
};*/

drawer.setLeftView(Alloy.createController("LeftMenu",drawer).getView());
	Ti.API.info('drawer Left');

 _menu({
            x: drawer
        });
};
