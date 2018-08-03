exports.show=function(text){
	var nwin=Ti.UI.createWindow({width: Ti.UI.FILL,
	height: "100dp",
	top: "0dp",
	//backgroundColor:"yellow"
	});
	
var Modal=Ti.UI.createView({
	width: "280dp",
	height: 70,
	borderRadius: 5,
	backgroundColor: "#000",
	top:-10
	});

var textLabel=Ti.UI.createLabel({
		//top: "0dp",
	left: "0dp",
	right: "0dp",
	height: Ti.UI.SIZE,
	color: "#FFF",
	text:text+ " ",
	textAlign: "center",
	font: {
		fontSize: 13,
		fontWeight: "bold"
	}
});

Modal.add(textLabel);

test();
function test(){
	open();
	setTimeout(function() {
			close();
		}, 3000);
};


function open() {
	nwin.open();
	nwin.add(Modal);
	//CONFIG.view.add($.Wrapper);
	
	Modal.animate({
		top: "20dp",
		duration: 250
	});
};

/**
 * Closes the toast notification
 * @private
 */
function close() {
	
	Modal.animate({
		top: "-10",
		duration: 250
	}, function(_event) {
		
			nwin.close({animated: true});
		
	});
};

function closeswipe(direction) {
	if (direction=="left") {
		Modal.animate({
		left: "-1000",
		duration: 250
	}, function(_event) {nwin.close();});
	} else{};
	Modal.animate({
		top: "-10",
		duration: 250
	}, function(_event) {nwin.close({animated: true});});
};




nwin.addEventListener('swipe',function(e){  close(); });

Modal.addEventListener('swipe',function(e){  close(); });

};