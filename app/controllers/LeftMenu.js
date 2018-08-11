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
         {title:"",img:""},
         {title:" اتصل بنا ",img:"/img/mail.png"},
         {title:" عن التطبيق ",img:"/img/info.png"},
         {title:" سياسة الخصوصية ",img:"/img/data-privacy.png"},
         {title:" شارك التطبيق ",img:"/img/share.png"},
         
         
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
                if ((Ti.App.Properties.getString("userID")==null) || (Ti.App.Properties.getString("userID")=="undefined")){
			 var x={title:data[e.index].title};
             Alloy.Globals.Navigator.open("loginUser",x); 
		}else{
               logOutUser();
              }
                
                
                
                closeAllWin();
              
                
                break;
                 
                case 6:
                closeAllWin();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("contactUs",x); 
                
                break;
                
                case 7:
                closeAllWin();
               var x={title:data[e.index].title,url:"get_about"};
               Alloy.Globals.Navigator.open("policeAbout",x); 
                
                break;
                case 8:
                closeAllWin();
              var x={title:data[e.index].title,url:"get_police"};
               Alloy.Globals.Navigator.open("policeAbout",x);  
               break;
               
                case 9:
                closeAllWin();
              shareMe();
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
                          	 //Ti.App.fireEvent("activeUser");
                 }catch(e){};
                };
                 for (var i=0; i < mainSec.length; i++) {
                 try{
                 	
                         var winx= mainSec[i];
                         if (winx.id=="mainStore") {
                          	winx.close();
                          	};
                          	 
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
    
   Ti.App.addEventListener("activeUser",activeUser);
activeUser();
function activeUser(){
	if ((Ti.App.Properties.getString("userID")==null) || (Ti.App.Properties.getString("userID")=="undefined")) {
			 $.officeName.text="زائـــر";
			 $.tableView.data[0].rows[4].children[0].children[1].text="تسجيل الدخول";
			// Ti.API.info('leftMenu: '+JSON.stringify($.tableView.data[0].rows[6])); 
			 //$.tableView.data[0].rows[4].height=0;
			  Ti.API.info('user Name '+Ti.App.Properties.getString("userName"));
			 activeDealer();
		}else{
			$.tableView.data[0].rows[4].children[0].children[1].text="تسجيل الخروج";
			$.officeName.text=Ti.App.Properties.getString("userName");
		};
		
		
};

function activeDealer(){
		if ((Ti.App.Properties.getString("userstoreID")==null) || (Ti.App.Properties.getString("userstoreID")=="undefined")) {
			 $.officeName.text="زائـــر";
		}else{
			$.officeName.text=Ti.App.Properties.getString("userstoreName");
		};
};
//rtl($.tableView);

function shareMe(){
    //alert("hi pop");
    var desc="هذا التطبيق هو منصة لخدمة الأسرة المنتجة لعرض منتجاتها اونلاين سواء كانت مأكولات او حرف يدوية او غيرها من الاشياء التي تقوم بإنتاجها الأسرة ولا تستطيع تسويقها او عرضها في خارج نطاق المنزل لأي ظرف من الظروف . كما يتيح هذا التطبيق للأسرة فرصة ذهبية للترويج عن منتجاتها من خلال منصة متكامله تجمع جميع المنتجات وتضمن رواجها على نطاق واسع" ;
  // var desc="test test";
    var appIcon=$.img;//Ti.UI.createImageView({image:"/img/cancel.png"});
   // try{
        if (OS_IOS) {
          // Ti.Platform.openURL("http://maps.apple.com/?saddr=[30.1399928%2C31.3935582]&daddr=[30.07342838430457%2C31.345820014453125]"); 
        //var desc=responseData.name+","+responseData.sub_cat +" \n "+responseData.share_url;
        sharedata(appIcon,desc);
        }else{
           // var desc=responseData.name+","+responseData.sub_cat +" \n "+responseData.share_url;
            sharedata(appIcon,desc);
        };
   // }catch(e){alert(e.message);};
  // appIcon=null;desc=null;
	};
	

function logOutUser(){
	 closeAllWin();
	 
	 Ti.App.Properties.setString("userID",null);
	 Ti.App.Properties.setString("userName",null);
	 activeUser();
	
};