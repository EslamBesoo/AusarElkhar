
exports.createCarttbl=function(){
var db = Ti.Database.open('FDB');
	if(db){
	    //db.execute('DROP TABLE IF EXISTS cart');
	db.execute('CREATE TABLE IF NOT EXISTS cart(pid TEXT PRIMARY KEY, name TEXT, qty TEXT,unitID TEXT, unitName TEXT, price TEXT,imgUrl TEXT,sID TEXT);');
	
	}
	db.close();
};
exports.addToCart=function(dataArray,type){
	try{
	var db = Ti.Database.open('FDB');
	if(db){
	try{
		Ti.API.info("dataArray"+JSON.stringify(dataArray));
	db.execute('INSERT INTO cart (pid, name, qty,unitID,unitName,price,imgUrl,sID) VALUES (?, ?, ?, ?, ?, ?, ?,?)', dataArray);
	toast("تمت الإضافة للسة");
	
	}catch(e){
		//if (type!="desc") {type.image="/images/addedtocart.png";};
		toast("تم اضافة هذا المنتج من قبل للسة ");
	  // if (e.message.indexOf("column pid is unique") !==-1) {toast("تم اضافة عذا المنتج من قبل للسة ");};
	  // toast('Error db: '+JSON.stringify(e));
	 Ti.API.info('Error db: '+JSON.stringify(e));
	}
	//getCart();
	}
	db.close();
	}catch(e){alert("err db"+e.message);};
};

exports.getCart=function(){
	try{
	var db = Ti.Database.open('FDB');
	 
	 var rows = db.execute('SELECT * FROM cart');
	 Ti.API.info("rowsData: \n"+JSON.stringify(rows));
	 pkQty=rows.rowCount;
	 Ti.App.fireEvent("getCountItem");
  while (rows.isValidRow())
  {
  	checkProductID=rows.field(0);
  // Ti.API.info('cart data ---> ROWID: ' + rows.field(0) + ', name:' + rows.field(1) + ', qty: ' + rows.field(2) + ', color: ' + rows.field(3)+ ', rows: ' + rows.field(4));
    rows.next();
  }
  rows.close();
  db.close();
 }catch(e){alert("err db:"+JSON.stringify(e));};
};



exports.getItembyID=function(ItemID){
	try{
	var db = Ti.Database.open('FDB');
	 
	 var rows = db.execute('SELECT * FROM cart WHERE pid=?',ItemID);
 		//alert(rows.rowCount);
 		if (rows.rowCount>0) {
 			while (rows.isValidRow()){
 				checkProductID=rows.field(0);
 				qtyProductID=rows.field(2);
 				 rows.next();
 			};
  
  	};
  rows.close();
  db.close();
 }catch(e){};//alert("/err db:"+JSON.stringify(e));};
};

exports.get2Cart=function(_callBack){
		var standardsList=[];
	
	function arrUnique(arr) {
    var cleaned = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
        
            if (_.isEqual(itm, itm2)) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
}



    try{
    var _dataTable=[];
    var _storData=[];
    var db = Ti.Database.open('FDB');
     
    var rows = db.execute('SELECT * FROM cart');
    // Ti.API.info('rowData: '+);
    var rowx=rows.rowCount;
  while (rows.isValidRow())
  {
      var rowData={
      	"id":parseInt(rows.field(0)),
      	"name":rows.field(1),
      	"qty":rows.field(2),
      	"unit":parseInt(rows.field(3)),
      	"unitNmae":rows.field(4),
      	"price":parseInt(rows.field(5)),
      	"imgUrl":rows.field(6),
      	"storeID":rows.field(7)
      	
      	};
     
      _dataTable.push(rowData);
      _storData.push({storeID:rows.field(7)});
      //rowx++;
      rows.next();
  } // end while
  
  if (rowx>0) {
  	 standardsList = arrUnique(_storData);
  	// get list StorID after remove Duplicates data
// var liststor= removeDuplicates(_storData);
 
 //Ti.API.info('item: '+JSON.stringify(_dataTable));
   //Ti.API.info('storid: '+JSON.stringify(standardsList));
      _callBack({
                  success:true,
                  data:_dataTable,
                  storData:standardsList
               });
  }else{ _callBack({
                  success:false,
                  data:_dataTable,
                  storData:_storData
               });};
  
  rows.close();
  db.close();
 }catch(e){Ti.API.info("err db:"+JSON.stringify(e.message));};
};

exports.updateqtyCart=function(dataArray){
   // try{
	var db = Ti.Database.open('FDB');
	if(db){
		//db.execute('UPDATE cart SET qty=?,unitID=?,unitName=?,price=? WHERE pid=?',dataArray);
		if (OS_IOS) {
			Ti.API.info('update Fun arrData='+dataArray[0]+dataArray[1]);
			db.execute('UPDATE cart SET qty='+dataArray[0]+' WHERE pid='+dataArray[1]);
			//Ti.API.info('UPDATE cart SET qty='+dataArray[0]+'WHERE pid='+dataArray[1]);
		} else{
			db.execute('UPDATE cart SET qty=? WHERE pid=?',dataArray);
		};
		 toast("تم تعديل الكمية");
	}
	db.close();
	//}catch(e){};
};
function createTable(e) {  
 var db = Ti.Database.open('codeguru');
 if(db){
  db.execute('CREATE TABLE people (name TEXT, phone_number TEXT, city TEXT)');
  var thisName = 'Arthur';
  var thisPhoneNo = '1-617-000-0000';
  var thisCity = 'Mountain View';
  db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', thisName, thisPhoneNo, thisCity);

  var personArray = ['Paul','020 7000 0000', 'London'];
  db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', personArray);

  var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');
  while (rows.isValidRow())
  {
    Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('rowid') + ', name:' + rows.field(1) + ', phone_number: ' + rows.fieldByName(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
    rows.next();
  }
  rows.close();
 }
    alert($.label.text);
}

exports.deletfromCArt=function(){
    try{
     db = Ti.Database.open('FDB');
    db.execute('DELETE FROM cart');// WHERE pid=?',productId);
     pkQty=0;
      Ti.App.fireEvent("getCountItem");
      Ti.API.info("pkQty"+pkQty);
      }catch(e){};
      db.close();
};


exports.del=function(productId){
   // try{
     db = Ti.Database.open('FDB');
     if (OS_IOS) {
     	db.execute('DELETE FROM cart WHERE pid='+productId);
     }else{
     	db.execute('DELETE FROM cart WHERE pid=?',productId);
     };
    
      var rows = db.execute('SELECT * FROM cart');
       toast("تم حذف المنتج من العربة");
       Ti.API.info('productId: '+productId);
     pkQty=rows.rowCount;
      Ti.App.fireEvent("getCountItem");
      Ti.API.info("pkQty"+pkQty);
     // }catch(e){};
     db.close();
};
