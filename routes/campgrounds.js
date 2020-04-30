var express= require("express");
var router = express.Router();
var campGrounds = require("../models/campground");
var comments = require("../models/comment");
var user = require("../models/user")
var methodOverride = require("method-override");
var middleware = require("../middleware");

router.get("/", function(req, res){
	//console.log(req.user);
	campGrounds.find({}, function(err, allcamps){
		if(err){
			console.log("error");
		}else{
			res.render("campGround/index", {campGround: allcamps, currentUser: req.user});
		}
	})
})

//create new cammpground
router.post("/",middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author ={
		id: req.user._id,
		username : req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	//campGround.push(newCampground);
	campGrounds.create(newCampground, function(err, newcamp){
		if(err){
			console.log("error");
		}else{
			res.redirect("/campGround");
		}
	})
})

//go to create new campground form
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campGround/new");
})

// show the camp ground
router.get("/:id", function(req, res){
	//get campground based on the id
	campGrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("error");
		}else{
			//render the show template
			//console.log(foundCampground);
			res.render("campGround/show",{campGround: foundCampground});			
		}
	})
})

//edit route

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
	campGrounds.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect("/campGround");
		}else{
			res.render("campGround/edit",{campGround: foundCampground});
		}
	})
})
//update route
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
	//console.log(req.body.campground);
	//find and update correct campground
	campGrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campGround");
		}else{
			req.flash("success", "Campground has been updated.");
			//console.log(updatedCampground);
			res.redirect("/campGround/" + req.params.id);
		}
	})
})

//destroy or remove
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
	campGrounds.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campGround");
		}else{
			res.redirect("/campGround")
		}
	})
})


module.exports = router;