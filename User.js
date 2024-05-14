const express = require("express");
const router = express.Router();
const User = require ("../models/User.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");



router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
 });

 router.post ( 
  "/signup", 
 wrapAsync(async (req, res) => {
  try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registerUser = await User.register(newUser, password);
    console.log(registerUser)
    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
  })
);

 router.get
 ("/Login", (req, res) => {
  res.render("users/Login.ejs");
 });

 router.post (
 "/Login", 
 passport.authenticate("local", { failureRedirect : '/Login', failureFlash: true, }), 
 async (req, res) =>{
  req.flash( "success", "Welcome Back to wanderlust!")
  res.redirect("/listings");
 }

 );

 router.get("/logout", (req, res, next) => {
  req.logout((err) =>  {
    if(err) {
    return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  })
 })

 module.exports = router;