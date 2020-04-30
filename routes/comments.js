var express= require("express");
var router = express.Router({mergeParams: true});
var campGrounds = require("../models/campground");
var comments = require("../models/comment");
var middleware = require("../middleware");


//comments route
// new comment
router.get("/new",middleware.isLoggedIn, function(req, res){
	campGrounds.findById(req.params.id, function(err, foundcamp){
		if(err){
			console.log("error");
		}else{
			res.render("comments/new", {campGround: foundcamp});
		}
	})
})

router.post("/",middleware.isLoggedIn, function(req, res){
	campGrounds.findById(req.params.id, function(err, campground){
		if(err){
			console.log("error");
			res.redirect(".campGround");
		}else{
			comments.create(req.body.comment, function(err, comment){
				if(err){
					console.log("error");
				}else{
					//console.log(comment);
					//add username and id to a comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//add comments to compgrounds
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campGround/"+ campground._id);
				}
			})
		}
	})
})

//edit comment route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	comments.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {campGround_id : req.params.id , comment: foundComment});
		}
	})
})

//update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campGround/" + req.params.id);
		}
	})
})

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	comments.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campGround/" + req.params.id);
		}
	})
})

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req, res, next){
// 	if(req.isAuthenticated()){
// 		comments.findById(req.params.comment_id, function(err, comm){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 				if(comm.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					res.redirect("back");
// 				}
// 			}
// 		})
// 	}else{
// 		res.redirect("back");
// 	}
// }


module.exports = router;