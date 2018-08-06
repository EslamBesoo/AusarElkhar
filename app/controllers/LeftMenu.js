// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var drawer=args;
var rowCount;

            			 Ti.App.Properties.getString("officeID");
            			
  
 // $.officeName.text=Ti.App.Properties.getString("officeTitle");;
//$.img.image=Alloy.Globals.imagePath+Ti.App.Properties.getString("officeImg")+"&h=150&w=150&q=100&zc=0";
//alert(JSON.stringify(drawer));
 var data = [
        {title:"الرئيسية",img:"/images/btn/home.png"},
       
        {title: " طلباتي",img:"/images/btn/list.png"},
        {title:" سلة الشراء",img:"/images/btn/cart.png"},
        {title:"ادارة المحلات",img:"/images/btn/home.png"},
         {title:"تسجيل الدخول",img:"/img/login.png"},
         
    ];
    rowCount=data.length;
         
    for (var i=0; i <rowCount; i++) {
     var rowitem= data[i];
     var rowController=Alloy.createController("/row/rowMenu",rowitem).getView();
         $.tableView.appendRow(rowController);
         rowController=null;
         rowitem=null;
    };
    
   if (OS_IOS) {drawer.setShouldStretchDrawer(true);};
    
   
    
    $.tableView.addEventListener("click", function(e){
       // Ti.API.info("isLeftWindowOpen: " + drawer.isLeftWindowOpen());
      // closeAllios();
        switch(e.index){
            case 0:
            closeAllWin();
      
                break;
            case 1:
                closeAllWin();
               var x={title:data[e.index].title};
              Alloy.Globals.Navigator.open("myOrders",x);
                break;
            case 2:
             closeAllWin();
            var x={title:data[e.index].title,type:""};
              Alloy.Globals.Navigator.open("cartList",x); 
               
                break;
            case 3:
             closeAllWin();
             if ((Ti.App.Properties.getString("userstoreID")==null) || (Ti.App.Properties.getString("userstoreID")=="undefined")){
			 var xx={title:"تسجيل الدخول",data:x,back:true};
 			 Alloy.Globals.Navigator.open("loginUser",xx); 
		}else{
               var x={title:data[e.index].title,userType:"dealer"};
               Alloy.Globals.Navigator.open("mainStore",x); 
              }
                break;
                
                case 4:
                closeAllWin();
               var x={title:data[e.index].title};
             Alloy.Globals.Navigator.open("loginUser",x); 
                
                break;
                 
                case 5:
                closeAllWin();
               var x={title:data[e.index].title};
               //Alloy.Globals.Navigator.open("quranRadio",x); 
                
                break;
                 
           
                
              
        }

if (OS_IOS) {
           			drawer.toggleRightWindow();
           	} else{
           		 	getToggel(drawer);
           	};
       

        if (Alloy.Globals.applang=="ar") {
					//drawer.toggleRight();
					//drawer=null;
					//data=null;
				}else{
					//drawer.toggleLeft();
					//drawer=null;
					//data=null; 
				};
       
      
    });
    /*
    var dara=[
    
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
]
    
    {
    mosque_id:1,
    name:"ehab ail",
    address:"giza,fasiel,from Mobile test",
    phone:"01157887337",
    proudct_List:[{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},]
    }
 */
   function closeAllWin(){
       //  if (OS_ANDROID) {
        for (var i=0; i < appSec.length; i++) {
                 try{
                         var winx= appSec[i];
                         Ti.API.info('winx: '+winx.id);
                          	winx.close();
                 }catch(e){};
                };
                
               //  };
    };
    
    function closeAllios(){
        
        for (var i=0; i < appSec.length; i++) {
                 try{
                     if (OS_IOS) {
                         var winx= appSec[i];
                         winx.close();
                     };
                 }catch(e){};
                };
    };
    
   
//rtl($.tableView);