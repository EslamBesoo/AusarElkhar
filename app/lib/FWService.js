exports.open=function(controller,payload){
	 
		var drawer;
		 var header=Alloy.createController("view/AppHeader","args").getView();
		 var footer=Alloy.createController("view/buttonbar",controller).getView();
		  var dealerFooter=Alloy.createController("view/dealerbuttonbar",controller).getView();
		try{
		var win = Alloy.createController(controller, payload || {}).getView();
		
		
		var args={data:payload.title};
		// set Title
		header.children[1].text= payload.title ;
		header.children[2].addEventListener('click',function(evt){
		    
          var x={title:"عربة الشراء",back:true};
          Alloy.Globals.Navigator.open("cartList",x);
          
         
           // drawer.toggleRightWindow();
         });
		 if (payload.search) {
		 header.children[2].visible=true;
    	};
          if (payload.userType=="dealer") {
          	header.children[2].visible=false;
          	}; 
           if (win.id=="OfficeAccount") {
           	header.children[1].text="";
           	header.backgroundColor="transparent";
           };
	
           // Back Burtton  
         header.children[0].addEventListener('click',function(evt){
             if (payload.back) {
             	if (OS_IOS) {
             		 drawer.close(); 
             	} else{
             		 win.close(); 
             	};
          
	           }else{
		         	if (OS_IOS) {
           			drawer.toggleRightWindow();
           	} else{
           		 	getToggel(drawer);
           	};
           	};
          
         });
        // Search Button
        if (payload.search) {
        	 header.children[2].visible=true;
          header.children[2].addEventListener('click',function(evt){
             var x={title:"البحث",page:payload.page};
               var win= Alloy.Globals.Navigator.open("searchApp",x); 
         });
         
         };
         
         
		if(OS_IOS){	
			 win.add(header);	 
			   if ((win.id!="cartList") && (win.id!="itemDetails")){
				   	if (payload.userType=="dealer") {
				   		 win.add(dealerFooter);
				   	} else{
				   		 win.add(footer);
				   	};
		    
		 		};			  
		    iosdrawer._menu(win,function(_drawer){drawer=_drawer.x;});
		     
            drawer.open();
              if (payload.back) {
                  header.children[0].children[0].image="/images/back.png"; drawer.setOpenDrawerGestureMode(OPEN_MODE_NONE);
                  // rtlEN(header.children[0].children[0]);
                   if (win.id=="cartList") {header.children[2].visible=false;
                       };
                };
		   if ((win.id!="mainApp") && (win.id!="mainStore")) {
		     appSec.push(drawer);
		  }else{mainSec.push(win);};
		   
		 }else {
			 win.children[0].add(header);
			 if ((win.id!="cartList") && (win.id!="itemDetails")){
			 	 		if (payload.userType=="dealer") {
				   		win.children[0].add(dealerFooter);
				   	} else{
				   		win.children[0].add(footer);
				   	};
			 	 };
			  androdrawer._menu(win.children[0],function(_drawer){drawer=_drawer.x;});
			  win.add(drawer);
							  win.addEventListener('open', function(){
							    var activity = win.getActivity(),
							        actionBar = activity.getActionBar();
							
							    if (actionBar) {
							       activity.actionBar.hide();
							    } 
							});
			  
			   if (payload.back) {
			       header.children[0].children[0].image="/images/back.png";
			   };
            win.open();
                
           if ((win.id!="mainApp") && (win.id!="mainStore")) {
           appSec.push(win);
          }else{mainSec.push(win);};
                
		};
 
	
	}catch(e){alert("err:"+e);};
};//end open Navigation

exports.open2=function(controller,payload){
		var drawer;
		 var header=Alloy.createController("view/AppHeader","args").getView();
		try{
		var win = Alloy.createController(controller, payload || {}).getView();
		
		var args={data:payload.title};
		
		if (payload.title.length>45) {
			header.children[1].text=(payload.title).substring(0,44)+" ...";
		}else{header.children[1].text= payload.title ;};
		
    		 
           
		 
         header.children[0].addEventListener('click',function(evt){
             if (payload.back) {
           win.close(); 
           };
          
         });
         
		if(OS_IOS){		  
		   // iosdrawer._menu(win,function(_drawer){drawer=_drawer.x;});
            win.open();
              if (payload.back) {
                  header.children[0].children[0].image="/images/back.png"; drawer.setOpenDrawerGestureMode(OPEN_MODE_NONE);
                   if (win.id=="cartList") {header.children[2].visible=false;
                       };
                };
		  if (win.id!="home") {
		     appSec.push(win);
		  };
		   
		    }else {
			 win.add(header);
			   if (payload.back) {
			       header.children[0].children[0].image="/images/back.png";
			      
			   };
			  
                 win.open();
                 //Why Dont Close MAin Page
                 if (win.id!="Offer") {
                 	appSec.push(win);
                 }// else{alert(win.id);};
               
			  //
		};

	
	}catch(e){alert("err:"+e);};
};//end open Navigation

exports.hideActionBar=function(controller){
	
	//var activity=controller.activity;
	//activity.actionBar.hide();

};


function cleanWindow(winObj) {
    if (winObj.children) {
        Ti.API.info("Children: "+winObj.children);
        for (var i = winObj.children.length; i > 0; i--){
        //I added the below line to try and reset the child back to nothing before removing it, but this return an out of bounds error.
        //winObj.children[i-1] = null;
        winObj.remove(winObj.children[i-1]);
        }

    }
}


