const UserModel = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')


// helper function for creating the token
function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({sub:user.id,iat:timestamp},config.jwt_secret)
}

// after the users credentials have been verified, hand them the token
exports.signin = function(req,res,next){
	res.send({token:tokenForUser(req.user)})
}

// if all the fields are valid and the user with the same email/username doesn't exists, create one and hand them the token.
exports.signup = function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;

	UserModel.findOne({email:email}, function(err,existingUser){
		if(err){return next(err)}
		if(existingUser){
			return res.status(422).send({error:"Email has already been taken"})		
		}
		if(!email || !password){
			return res.status(422).send({error:"Please enter username and/or password"})
		}

		const user = new UserModel({
			email:email,
			password:password
		});
		user.save(function(err){
			if(err){return next(err)};

			res.json({token:tokenForUser(user)});
		});

	})
}