var express = require("express");
var passport = require("passport");
var path = require("path");

var User = require("./models/user");
var router = express.Router();

const myDatabase = require('./myDatabase');    //added
let db = new myDatabase();


//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});
router.get("/successroot", function(req, res) {
console.log("get successroot");
  res.json({redirect:"/"}); 
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
  res.json({redirect:"/login"});  
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
if(req.user.username == "admin"){
  res.json({redirect:"/admin"});
  }
else
  res.json({redirect:"/draw"}); 
});

/*
router.get("/update", function(req, res) {
console.log(req.grade);
});
*/
router.get("/failsignup", function(req, res) {
console.log("get failsignup");
  res.json({redirect:"/signup"});  
});

router.get("/successlogin", function(req, res) {
console.log("get successlogin");

if(req.user.username == "admin"){
  res.json({redirect:"/admin"});
  }
else
  res.json({redirect:"/draw"}); 
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
  res.json({redirect:"/login"});  

});

router.get("/d",function(req,res) {
  if (req.isAuthenticated() && req.user.username == "admin") {
  console.log("sendFile deleteStuff.html")
  let thePath = path.resolve(__dirname,"deleteStuff.html");   
  res.sendFile(thePath);
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});
router.get("/userInfo",function(req,res){
  console.log("get userInfo");
     if (req.isAuthenticated()) {
  console.log("req isAuthenticated");
  console.log("valueJY = " + req.user.valueJY);     /* user defined value */
    return (res.json({name:req.user.username}));
    //res.json({username:req.user.username});
  }
  else {
  console.log("req is not Authenticated");
    res.json({name:'error'});
  }
});
router.get("/",function(req,res) {
  
  if (req.isAuthenticated()) {
    if(req.user.username == "admin")
    {
    let thePath = path.resolve(__dirname,"admin.html");   
    res.sendFile(thePath);
    return;
    }
    console.log("sendFile index.html")
  let thePath = path.resolve(__dirname,"index.html");   
  res.sendFile(thePath);
  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});

router.get("/gallery",function(req,res) {
  if (req.isAuthenticated()) {
    console.log("sendFile gallery.html")
  let thePath = path.resolve(__dirname,"gallery.html");   
  res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});




router.get("/signup", function(req, res) {
console.log("get signup");

  let thePath = path.resolve(__dirname,"signup.html");    
  res.sendFile(thePath);  

});

router.get("/login", function(req, res) {
console.log("get login");

  let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  

});
router.get("/admin", function(req, res) {
  console.log("get admin session");
  if (req.isAuthenticated() && req.user.username == "admin") {
    console.log("sendFile admin.html")
  let thePath = path.resolve(__dirname,"admin.html");   
  res.sendFile(thePath);
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});

router.get("/draw", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
    console.log("sendFile index.html")
  let thePath = path.resolve(__dirname,"index.html");   
  res.sendFile(thePath);
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});

router.get("/logout", function(req, res) {
  console.log("get logout")
  if (req.isAuthenticated()) {
  console.log("req isAuthenticated");
    req.logout();
    res.redirect("/successroot");
  } else {
  console.log("req is not Authenticated");
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  if (username.trim() == "" || password.trim() == "")
   return res.redirect("/failsignup");


  User.findOne({ username: username }, function(err, user) {
console.log("User findOne function callback")
    if (err) 
    {
      console.log("err"); 
      return next(err); 
    }
    if (user) {
      console.log("user")
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("new User")
    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);    //goes to user.js (userSchema.pre(save))
  });


}, passport.authenticate("login", {       //goes to setuppassport.js  (passport.use("login"))
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));

router.get("/userGallery",function(req,res) {
  if (req.isAuthenticated()) {
    console.log("sendFile userGallery.html")
  let thePath = path.resolve(__dirname,"userGallery.html");   
  res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});



router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

router.get("/b",function(req,res) {
  if (req.isAuthenticated()) {
  let thePath = path.resolve(__dirname,"LCanvas.html");   
  res.sendFile(thePath);  
  } else {
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
});



module.exports = router;