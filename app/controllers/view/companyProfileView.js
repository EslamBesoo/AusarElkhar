// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.image;
$.lblTitle.text="\n"+args.name;
$.lblCountry.text=args.country_name+" - "+args.city_name;
$.lblDesc.text=args.note;
if (args.is_close==1) {
	$.imgStatus.image="/images/store/loc.png";
	$.lblLocation.text="مغلق الآن";
	
};


if (args.reliable==0) {
	$.imgRelable.visible=false;
	$.lblRelable.visible=false;
};


function openWhats(){
	openWhtasApp(args.phone);
};


function CallComp(){
	Titanium.Platform.openURL('tel:'+args.phone);
};



////////// rate View ////////////

var flag=false;
function termsRate(){
	if (flag) {
		$.imgTerms.image="/img/check-box-empty.png";
		flag=false;
	
	}else{
		$.imgTerms.image="/img/black-check-box-with-white-check.png";
	flag=true;
	};
};

var _Service=require("xhrService");
var rateValue=0;
function sendComment(){
	if ((Ti.App.Properties.getString("userID")==null) || (Ti.App.Properties.getString("userID")=="undefined")){
		toast("يجب تسجل في اسر الخير اولا");
	}else{
	if ($.txtSearch.value!="") {
if (rateValue>0) {
if (flag) {
				    var x={
				    	user_id:Ti.App.Properties.getString("userID"),
				    	store_id:args.store_id,
						rate:rateValue,
						comment:$.txtSearch.value
					
					};
					
				_Service.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('change_status Done: '+JSON.stringify(_response));
		    			//Ti.App.fireEvent("reloadMyOrderData");
		    			toast("تم التقيم ");
						//inti();	 
					}else{
						toast("توجد مشكلة الآن حاول مرة اخري");
						$.OrderProductList.close();
						Ti.API.info('change_statusr: '+JSON.stringify(_response));
						};
			},"send_rate",$.rateUser,x,"rateUser");
			
} else{
	toast("يجب ان توافق ع التعهد اولا");};
} else{
toast("يجب ان تختار التقيم اولا");};
} else{toast("يجب ان تكتب تعليق  ");};

};//end if userID

};


function img1(){
	rateValue=1;
	$.img1.image="/images/store/star1.png";
	
	$.img2.image="/images/store/star.png";
	$.img3.image="/images/store/star.png";
	$.img4.image="/images/store/star.png";
	$.img5.image="/images/store/star.png";
};


function img2(){
	rateValue=2;
	$.img1.image="/images/store/star1.png";
	$.img2.image="/images/store/star1.png";
	
	$.img3.image="/images/store/star.png";
	$.img4.image="/images/store/star.png";
	$.img5.image="/images/store/star.png";
};

function img3(){
	rateValue=3;
	$.img1.image="/images/store/star1.png";
	$.img2.image="/images/store/star1.png";
	$.img3.image="/images/store/star1.png";
	
	$.img4.image="/images/store/star.png";
	$.img5.image="/images/store/star.png";
};

function img4(){
	rateValue=4;
	$.img1.image="/images/store/star1.png";
	$.img2.image="/images/store/star1.png";
	$.img3.image="/images/store/star1.png";
	$.img4.image="/images/store/star1.png";
	
	$.img5.image="/images/store/star.png";
};

function img5(){
	rateValue=5;
	$.img1.image="/images/store/star1.png";
	$.img2.image="/images/store/star1.png";
	$.img3.image="/images/store/star1.png";
	$.img4.image="/images/store/star1.png";
	$.img5.image="/images/store/star1.png";
};



