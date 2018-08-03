// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.image=args.proudct_image;
$.lblTitle.text=args.proudct_name;
$.lblDesc.text=" الكمية "+args.qut;
$.lblPrice.text=" السعر "+ args.price+" "+currancyType;

  Ti.API.info('args: '+JSON.stringify(args));