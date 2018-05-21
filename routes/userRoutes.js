const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/authentication')
const passport = require('passport')
const passportService = require('../services/passport')

// create middlewares for checking if the user is authenticated / logged in
const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false})


router.get('/',requireAuth,(req,res) => {
	res.send("Welcome")
	});

router.post('/signup',Authentication.signup);

router.post('/signin',requireSignin,Authentication.signin);


// app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })
module.exports = router;