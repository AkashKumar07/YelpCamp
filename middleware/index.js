var campGrounds = require("../models/campground");
var comments = require("../models/comment");

var middlewareObj={};

//campground ownership middlewareObj
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		campGrounds.findById(req.params.id, function(err, camp){
			if(err){
				req.flash("error","oops!! there was an error");
				res.redirect("back");
			}else{
				if(camp.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You dont have permission to do that");
					res.redirect("back");
				}
			}
		})
	}else{
		res.redirect("back");
	}
}

//comment ownership middleware
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		comments.findById(req.params.comment_id, function(err, comm){
			if(err){
				req.flash("oops!! there was an error")
				res.redirect("back");
			}else{
				if(comm.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}

module.exports = middlewareObj;