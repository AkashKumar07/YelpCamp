var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing");
})



//Auth routes
//show sign-up forms
router.get("/register", function(req, res){
	res.render("register");
})

//handle sign-up
router.post("/register", function(req, res){
	User.register(new User({username : req.body.username}), req.body.password, function(err, user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("register");
		}
		passport.authenticate('local')(req, res, function(){
			req.flash("success", "Welcome to Yelpcamp"+user.username);
			res.redirect("/campGround"); 
		});
	})
})

//login form
router.get("/login", function(req, res){
	res.render("login",{message: req.flash("error")});
});

//handling the login logic
router.post("/login",passport.authenticate("local",
	{
	successRedirect: "/campGround",
	failureRedirect: "/login"
	}), function(req, res){
})

//logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have been successfully logged out!");
	res.redirect("/campGround");
})


module.exports = router;
