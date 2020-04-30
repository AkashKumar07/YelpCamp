var mongoose = require("mongoose");

var campGroundSchema = new mongoose.Schema({
	name : String,
	image: String,
	description: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String 
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment",
		}
	]
});

//var campGrounds = mongoose.model("campGround", campGroundSchema);

module.exports = mongoose.model("campGround",  campGroundSchema)