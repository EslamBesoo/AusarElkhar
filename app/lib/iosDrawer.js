exports._menu=function(navW,_menu){
    var NappDrawerModule = require('dk.napp.drawer');
    
    var drawer = NappDrawerModule.createDrawer({
        centerWindow: navW,
        //rightWindow: Ti.UI.createWindow({ backgroundColor: "red"}),
        closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
        openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
        showShadow: false, //no shadow in iOS7
        //leftDrawerWidth: 250,
        //rightDrawerWidth: 1,
        statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
        orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
       showShadow:true
    });
    
    drawer.setAnimationMode(NappDrawerModule.ANIMATION_PARALLAX_FACTOR_7);
    drawer.setAnimationVelocity(400);
    
   
         Ti.API.info('ar: '+Ti.Locale.currentLanguage);
        drawer.setRightWindow(Alloy.createController("LeftMenu",drawer).getView());
        drawer.rightDrawerWidth= 250;
  
    
     OPEN_MODE_NONE=NappDrawerModule.OPEN_MODE_NONE;
    // Disable Open Drawer by Gesture in subWindow
    var _disableMenu=function(e)
    {drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_NONE); };
    // Enable Open Drawer by Gesture 
    var _enableMenu= function(e)
    {drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_ALL);  };// drawer.setLeftDrawerWidth("80%");drawer.setRightDrawerWidth("80%"); };
     // Open Drawer from left button 
    var _togleMenu=function(e)
    {drawer.toggleRightWindow();};
    
    Ti.App.addEventListener('disableMenu', _disableMenu); 
    Ti.App.addEventListener('AddMenutest', _enableMenu);
    Ti.App.addEventListener("togleMenu2",_togleMenu);
     
        drawer.addEventListener('windowDidOpen', function(e) {
            Ti.API.info("windowDidOpen   ");
        //drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_NONE);
        });
        
        drawer.addEventListener('windowDidClose', function(e) {
            Ti.API.info("windowDidClose   ");
             //drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_NONE);
        });

        Ti.API.info("isAnyWindowOpen: " + drawer.isAnyWindowOpen());
        _menu({
            x: drawer
        });
};
