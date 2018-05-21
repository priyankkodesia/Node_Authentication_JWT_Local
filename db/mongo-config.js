var mongoose = require('mongoose')
mongoose.Promise= global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://priyankkodesia:coursera123@ds261828.mlab.com:61828/practise',(err,res) => {
				console.log("Successfully connected to DB")
});

module.exports={
	mongoose
}