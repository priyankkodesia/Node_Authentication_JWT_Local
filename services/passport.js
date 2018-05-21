const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config') 
const UserModel = require('../models/user')
const LocalStrategy = require('passport-local')

const localOptions = {usernameField:'email'}

const localLogin = new LocalStrategy(localOptions,function(email,password,done){
	UserModel.findOne({email:email},function(err,user){
		if(err){ return done(err)}
		if(!user){ return done(null,false)}

		//compare passwords
	user.comparePassword(password,function(err,isMatch){
		if(err){ return done(err)}
		if(!isMatch){ return done(null,false)}

		return done(null,user);
	})
	})
})

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.jwt_secret || 'njkqbwjqqweqnwe12oiu3ojuio1287889123'
};

// payload = {sub:user.id,iat:timestamp} . This is the value assigned while creating the token
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){

	UserModel.findById(payload.sub, function(err,user){
		if(err){
			return done(err,false)
		}
		if(!user){
			return done(null,false)
		}
		else{
			return done(null,user)
		}

	})
})

passport.use(jwtLogin);
passport.use(localLogin);