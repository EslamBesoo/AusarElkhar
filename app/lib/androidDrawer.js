exports._menu=function(navW,_menu){
	try{
    var NappDrawerModule = require('dk.napp.drawer');
    
   var drawer = NappDrawerModule.createDrawer({
	    //leftWindow: Ti.UI.createView({backgroundColor:"green",width:0}),
	    centerWindow: navW,
	    //rightWindow: Ti.UI.createView({backgroundColor:"red"}),
	    leftDrawerWidth: "220dp",
	    rightDrawerWidth: "220dp",
	    fading: 0.5,
	    shadowWidth:"20dp",
	    orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
	    //closeDrawerGestureMode : NappDrawerModule.CLOSE_MODE_ALL,
	    openDrawerGestureMode : NappDrawerModule.OPEN_MODE_NONE,
	  	// animationMode : NappDrawerModule.ANIMATION_SCALE,
        fullscreen : false,
   });
//drawer.setLeftDrawerWidth("160dp");
	//drawer.setAnimationMode(NappDrawerModule.ANIMATION_PARALLAX_FACTOR_7);
   //drawer.setAnimationVelocity(400);
  //setLeftWindow
  //setRightWindow
 //
	drawer.setRightWindow(Alloy.createController("LeftMenu",drawer).getView());
    drawer.setLeftWindow(Alloy.createController("LeftMenu",drawer).getView());
    OPEN_MODE_NONE=NappDrawerModule.OPEN_MODE_NONE;
    //drawer.setLeftWindow(false);
    
    //Disable Open Drawer by Gesture in subWindow
   
        _menu({
            x: drawer
        });
       }catch(e){alert(JSON.stringify(e));};
      drawer.addEventListener("didChangeOffset", function(e) {
     
      	if (e.offset>0) {
      		//drawer.openDrawerGestureMode = NappDrawerModule.OPEN_MODE_NONE;
      	} else{
      		//drawer.openDrawerGestureMode = NappDrawerModule.OPEN_MODE_ALL;
      	};
   				// alert("didChangeOffset: " + e.offset);
			});
     drawer.addEventListener("windowDidOpen", function(e) {

	    if (e.window == NappDrawerModule.LEFT_WINDOW) {
	    	//drawer.openDrawerGestureMode = NappDrawerModule.OPEN_MODE_NONE;
	    	//drawer.toggleLeftWindow();
	    	
	    	
	    	
	       // Ti.API.info("windowDidOpen - LEFT DRAWER");
	    } else if (e.window == NappDrawerModule.RIGHT_WINDOW) {
	    	//drawer.openDrawerGestureMode = NappDrawerModule.OPEN_MODE_ALL;
	       // Ti.API.info("windowDidOpen - RIGHT DRAWER");
	    }

});
};
