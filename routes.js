let path = require("path");
var passport = require("passport");
let express = require("express");

var User = require("./models/user");
let router = express.Router();

/*
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

router.get("/d",function(req,res) {
  if (req.isAuthenticated()) {
    console.log("sendFile deleteStuff.html")
  let thePath = path.resolve(__dirname,"deleteStuff.html");   
  res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"login.html");   
  res.sendFile(thePath);  
  }
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
	res.json({redirect:"/"});	
});

/*
router.get("/update", function(req, res) {
console.log(req.grade);
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/signup"});	
});

router.get("/successlogin", function(req, res) {
console.log("get successlogin");
	res.json({redirect:"/"});	
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});	

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

if (username.trim() == "" || password == "")
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
=======

>>>>>>> Stashed changes
*/
router.get("/terms", function(req, res) {
console.log("get login");

  let thePath = path.resolve(__dirname,"terms.html");   
  res.sendFile(thePath);  

});

router.get("/privacy", function(req, res) {
console.log("get login");

  let thePath = path.resolve(__dirname,"privacy.html");   
  res.sendFile(thePath);  

});

router.get("/about", function(req, res) {
console.log("get login");

  let thePath = path.resolve(__dirname,"about.html");   
  res.sendFile(thePath);  

});

module.exports = router;