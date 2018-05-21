const mongoose =  require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const user_schema = new Schema({
	email: {type:String , unique: true , lowercase:true},
	password : {type:String }
})


// before saving the user to the database, hash the password
user_schema.pre('save', function(next){
	// set the user variable to current instance
	const user = this;

	//first generate a salt(random value) and once it is generated, 
	//add it into hashed value and store the result as password
	bcrypt.genSalt(10,function(err,salt){
		if(err){return next(err)}

		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err){return next(err)}

			user.password = hash;
			next();
		});
	});
});


//this method will be available on the current user instance and can be called on it
user_schema.methods.comparePassword = function(candidatePassword,callback){
	bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
		if(err){ return callback(err,null) }

		callback(null,isMatch);
	})
}

const UserModel = mongoose.model('UserModel',user_schema)
module.exports = UserModel 
