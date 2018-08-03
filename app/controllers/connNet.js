// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function closeme(){
	//args.remove($.connNet);
	args.close();
};

setTimeout(closeme,10000);
