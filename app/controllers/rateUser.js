// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
	var _Service=require("xhrService");
var rateValue=0;
function sendComment(){

				    var x={
				    	user_id:Ti.App.Properties.getString("userID"),
				    	product_id:args.id,
						rate:rateValue,
						comment:$.txtSearch.value
					
					};
					
				_Service.postservice(function(_response){
		    		if (_response.success) {
		    			Ti.API.info('change_status Done: '+JSON.stringify(_response));
		    			//Ti.App.fireEvent("reloadMyOrderData");
		    			toast("تم تغير حالة الطلب ");
						//inti();	 
					}else{
						toast("توجد مشكلة الآن حاول مرة اخري");
						$.OrderProductList.close();
						Ti.API.info('change_statusr: '+JSON.stringify(_response));
						};
			},"send_rate",$.rateUser,x,"rateUser");
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


