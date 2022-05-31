var mongoose = require("mongoose");

var Data = mongoose.model("img",{
    likes: Number,
    fileName: {
    	required:true,
    	unique:true,
    	type:String
    },
    name: String,
    user: String,
    color:String
});


module.exports = Data;