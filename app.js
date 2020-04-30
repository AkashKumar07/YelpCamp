var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport= require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require("connect-flash");
var campGrounds = require("./models/campground.js");
var comments = require("./models/comment.js");
var User = require("./models/user.js");
var methodOverride = require("method-override");
var seedDB = require("./seed.js");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//configuring the app
//console.log(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true, useCreateIndex: true}).then(() =>{
 	console.log("connected to db");
 }).catch(err => {
 	console.log('ERROR', err.message);
 });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs" );
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// removing the existing data and seeding with the new one
// seedDB();

//passport configuration
app.use(require("express-session")({
	secret: "have a nice day",
	resave: false,
	saveUninitialized: false
}))

// setting up routes
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to check if the user is logged in or not
app.use(function(req, res, next){
	res.locals.currentUser= req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campGround",campgroundRoutes);
app.use("/campGround/:id/comments",commentRoutes);

//setting up the server
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started");
})