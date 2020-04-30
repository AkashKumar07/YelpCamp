var mongoose = require("mongoose");
var campGrounds = require("./models/campground");
var comments = require("./models/comment")

var data=[
	{
		name: "Cloud's Rest",
		image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/201904161433491171-b106597a99ae11e999df0242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;0,20&output-format=jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc erat, ultrices sit amet nibh sit amet, auctor iaculis sem. Vestibulum posuere elementum quam, eu vehicula urna convallis vel. Duis ultricies nisl vitae mauris dictum sollicitudin. Duis nibh lectus, pellentesque ac nunc vitae, luctus laoreet risus. Pellentesque hendrerit velit sit amet dui ultrices, sed venenatis ante condimentum. In id dictum ante. Maecenas varius malesuada euismod. Cras convallis semper mi. Sed malesuada finibus velit, vitae molestie orci semper quis. Aliquam nec accumsan nisl, non elementum tortor. Praesent efficitur nec magna vel sagittis. Proin volutpat pellentesque eros eget convallis."
	},
	{
		name: "Moons's Rest",
		image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/201904161433491171-b106597a99ae11e999df0242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;0,20&output-format=jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc erat, ultrices sit amet nibh sit amet, auctor iaculis sem. Vestibulum posuere elementum quam, eu vehicula urna convallis vel. Duis ultricies nisl vitae mauris dictum sollicitudin. Duis nibh lectus, pellentesque ac nunc vitae, luctus laoreet risus. Pellentesque hendrerit velit sit amet dui ultrices, sed venenatis ante condimentum. In id dictum ante. Maecenas varius malesuada euismod. Cras convallis semper mi. Sed malesuada finibus velit, vitae molestie orci semper quis. Aliquam nec accumsan nisl, non elementum tortor. Praesent efficitur nec magna vel sagittis. Proin volutpat pellentesque eros eget convallis."
	},
	{
		name: "Sun's Rest",
		image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/201904161433491171-b106597a99ae11e999df0242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;0,20&output-format=jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc erat, ultrices sit amet nibh sit amet, auctor iaculis sem. Vestibulum posuere elementum quam, eu vehicula urna convallis vel. Duis ultricies nisl vitae mauris dictum sollicitudin. Duis nibh lectus, pellentesque ac nunc vitae, luctus laoreet risus. Pellentesque hendrerit velit sit amet dui ultrices, sed venenatis ante condimentum. In id dictum ante. Maecenas varius malesuada euismod. Cras convallis semper mi. Sed malesuada finibus velit, vitae molestie orci semper quis. Aliquam nec accumsan nisl, non elementum tortor. Praesent efficitur nec magna vel sagittis. Proin volutpat pellentesque eros eget convallis."
	}
]

function seedDB(){
	//remove all the campgrounds
	campGrounds.remove({}, function(err){
		if(err){
			console.log("error");
		}
		console.log("removed all the camp grounds");
		data.forEach(function(seed){
			campGrounds.create(seed, function(err, camp){
				if(err){
					console.log("error");
				}else{
					console.log("added the campground");
					comments.create({
						text: "the place is awesome but if it had internet it would be good",
						author: "batman"
					}, function(err, comment){
						if(err){
							console.log("error");
						}else{
							camp.comments.push(comment);
							camp.save();
							console.log("new camp created");
						}
					})
				}
			})
		})
	})
	
}

module.exports = seedDB;