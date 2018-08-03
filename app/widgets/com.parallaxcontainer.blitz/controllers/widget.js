var args = arguments[0] || {};

 var Utils= {
    /* modified version of https://gist.github.com/1243697 */
    _getExtension: function(fn) {
        // from http://stackoverflow.com/a/680982/292947
        var re = /(?:\.([^.]+))?$/;
        var tmpext = re.exec(fn)[1];
        return (tmpext) ? tmpext : '';
    },
    RemoteImage: function(a){
        a = a || {};
        var md5;
        var needsToSave = false;
        var savedFile;
        if(a.image){
            md5 = Ti.Utils.md5HexDigest(a.image)+this._getExtension(a.image);
            savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,md5);
            if(savedFile.exists()){
                a.image = savedFile;
            } else {
                needsToSave = true;
            }
        }
        var image = Ti.UI.createImageView(a);
        if(needsToSave === true){
            function saveImage(e){
                image.removeEventListener('load',saveImage);
                savedFile.write(
                    Ti.UI.createImageView({image:image.image,width:'Ti.UI.FILL',height:'Ti.UI.FILL'}).toImage()
                );
            }
            image.addEventListener('load',saveImage);
        }
        return image;
    }
};

var parallaxItem = Utils.RemoteImage({
    width:"100%",
    opacity:".7",
    //animating:true
});

var offset 					= 0;
var calculatedOffset		= 0;
var movement 				= 0;
var bounce 					= 0; 
var isOnScreen		 		= false; 

var parallaxIntensity=3;//		= parseInt(args.parallaxIntensity) || 5 
//var parallaxItem 			= args.children && args.children[0];
var apiname					= "";
var itemHeight=100;
var iteminnerMargin=160;



function init(args,imgFile){
//imgFile="/img/logohome@xxhdpi.png"
		parallaxItem.image=imgFile;
		parallaxItem.height = parseInt(itemHeight) + parseInt(iteminnerMargin); 
		//if (OS_IOS) {
		    parallaxItem.top = parallaxItem._top = - iteminnerMargin / 2;
		//}else{parallaxItem.top = parallaxItem._top = - iteminnerMargin / 3;};
		
		parallaxItem.addEventListener('postlayout', postlayout);

		Ti.API.info("parallaxItem.top: "  + parallaxItem.top);
			
    	$.parallaxContainerView.add(parallaxItem);
    
}

function setViewWithScrollAbility(parent,imgFile){
	/*
	 * 
	 */ 	
	 
	 init(args,imgFile);
 	if(OS_IOS){
	 	parent.addEventListener('scroll', updateScroll);
 	}
 	else if(OS_ANDROID){
	 	parent.addEventListener('touchend', touchend);
	 	parent.addEventListener('touchmove', updateScroll);
	 }
 	//----------------------------------------------------------------------
	
}


/* postlayout is used to determine whether the UI element is on screen or not
 * AFAIK there is no UI element property which tells whether it's currently rendered on screen or not 
 */
function postlayout(e){
	
	if(!isOnScreen){
		calculatedOffset = 0;
	}
	
	isOnScreen = true;
}
//----------------------------------------------------------------------....


function updateScroll(e){
	if(OS_IOS){
	    //if (parallaxItem.height>(parallaxItem.top+600)) {
		 parallaxItem.top = parallaxItem._top + (e.contentOffset.y  / 15);
		//};
	}
	else if (OS_ANDROID){
		
		if (e.source.getApiName( ) != apiname){
				/*If start scrolling while hit a Label or any other small UI element
				 *it might happen happen that the element changes which bubbles the touchmove event.
				 *Cause e.y delivers relative values you have to reset the bounce when the bubbling event changes.
				 * Otherwise the e.y value might change in an inapprioriate way. 
				*/
				apiname = e.source.getApiName( );
				bounce = (e.y+1);
		}
		
		if(isOnScreen){
			calculatedOffset =  ((e.y  - bounce)  * -1) + movement;
		}

		//Only update offset if it fits to the treshold
		if(Math.abs(calculatedOffset) < Math.abs(parallaxItem._top) && calculatedOffset >= 0){
			offset = calculatedOffset;
			//alert("calculatedOffset"+calculatedOffset);
		}
		
		parallaxItem.top = parallaxItem._top + ( offset / parallaxIntensity );	
		//alert("parallaxItem"+parallaxItem.top);	
	}
};

function touchend(e){
	if (OS_ANDROID){
			apiname = "";
			bounce = 0;
			movement = offset;
			isOnScreen = false;
	}
};


exports.setViewWithScrollAbility = setViewWithScrollAbility;
exports.init = init;