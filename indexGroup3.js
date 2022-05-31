let bodyParser = require('body-parser');
let cookieParser = require("cookie-parser");
let express = require('express');
let flash = require("connect-flash");
let mongoose = require("mongoose");
let passport = require("passport");
let path = require("path");
let session = require("express-session");
let fs = require("fs");
let sCanvas = [];

let setUpPassport = require("./setuppassport");
let routes = require("./routes");
let routesData = require("./routesData");


let app = express();

//let jsonFile = require(__dirname + "/fileFolder/dataBase.json");
const { v4: uuidv4 } = require('uuid');




mongoose.connect("mongodb://127.0.0.1:27017/imgdb");   
setUpPassport();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(flash());
app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(express.static('./fileFolder'));
app.use(express.static('./serverFiles'));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(routesData);

let http = require('http');
let dataBase=[];
let numPng=0;
let orderedDatabase=[];
let secToOrder = 1;
let password = "MDJ333"

app.use(express.static(path.join(__dirname, "public")));


const myDatabase = require('./myDatabase');
let db = new myDatabase();

db.getAllData(function(info) {
	if(info)
		dataBase=info;
});



fs.readdir(__dirname + '/fileFolder', function(err, files){
if (err)
  console.log(err);
  for (const i of files)
  {
    if(i.includes(".png"))
    {
    	numPng++;
    //fs.unlink will delete specified files
      //fs.unlink(__dirname + '/fileFolder/' + i, function(){});
    }
  }
  console.log(numPng);
});

//json file auto parses
//dataBase = jsonFile;
//dataBase = db.getAllData();

/**
 * Create HTTP server.
 */
let server = http.createServer(app);
////////////////////////////////
// Socket.io server listens to our app
let io = require('socket.io').listen(server);

io.on('connection', function(socket) {
	console.log("user connection")
	//sends imageName + text on server(fileFolder)

	if(sCanvas.length > 0)
		socket.emit('savedCanvasByArray', sCanvas);
	socket.emit('dataBase', dataBase);

	socket.on('deleteImg', function (imgName){
		db.deleteData(imgName);
		io.emit('deletedImg', imgName);
	});
	socket.on('clearBigCanvas', function (key){
		sCanvas = [];
		io.emit('clearedLCanvas', sCanvas);
	});


	socket.on('mouseDraw', function (data){
		sCanvas.push(data)
		socket.broadcast.emit('serverDraw', data);
	});


	socket.on('deleteAllImg', function (key){
		db.deleteAllData();
		dataBase = [];
		io.emit('deleteAllImgs', dataBase);
		});

	socket.on('deleteAllImgData', function (key){
		db.deleteAllData();
		dataBase = [];
		fs.readdir(__dirname + '/fileFolder', function(err, files){
			if (err)
			  console.log(err);
		  for (const i of files)
		  {
		    if(i.includes(".png"))
		    {
		    //fs.unlink will delete specified files
		    	fs.unlink(__dirname + '/fileFolder/' + i, function(){});
		    }
			  }
			});
		io.emit('deleteAllImgs', dataBase);
		});

	socket.on('like', function (imgName, likeVal)
	{
	    for (var i = 0; i < dataBase.length; i++) {
	        if (dataBase[i].fileName = imgName) {
	            dataBase[i].likes+=likeVal;
	            break;
	        }
		}
		db.putData(imgName, likeVal)
	});

	socket.on('base64file', function (data1, name, user,color) {
	const buffer = Buffer.from(data1, 'base64');
	const uuid = uuidv4();
	//console.log(buffer);
	dat = new data('img'+uuid+'.png',name, user, color);
	dataBase.push(dat);
	db.postData(dat);
	//will create img each will be numerically named, img0, img1...
	fs.writeFile('./fileFolder/img'+uuid+'.png', buffer, function (err) {
	if (err) throw err;
	console.log('saved png');
	io.emit('newImg', dataBase[dataBase.length-1]);
	});
	});
});

function data(fileName, name, user, color) {
    this.fileName = fileName;
    this.name = name;
    this.user = user;
    this.likes = 0;
    this.color = color;
}


function orderDatabase() {
	//replicates database
	db.getAllData(function(info) {
	if(info)
		dataBase=info;
	orderedDatabase = dataBase.slice(0);
	if(dataBase.length>0)
	{
		orderedDatabase = orderedDatabase.sort(function(a, b) { return b.likes - a.likes})
	}
	io.emit('updatedLikes', orderedDatabase);
	});
	
    setTimeout(orderDatabase, secToOrder*1000);
}
orderDatabase();


let port = process.env.PORT || 3003;

server.listen(port);