 const express = require("express");
 const router = express.Router({mergeParams: true});
 const wrapAsync = require("../utils/wrapAsync.js");
 const ExressError = require("../utils/ExpressError.js"); 
 const { reviewSchema } = require("../schema.js");
 const Review = require("../models/review.js");
 const Listing = require("../models/listing.js")

 const validatReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
 if (error) {
  let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExressError(400, errMsg);
  } else {
    next();
  }
 };

 // post Reviews Route 
  
  router.post
  ("/",
   validatReview, 
   wrapAsync (async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
   
    listing.reviews.push(newReview);
   
    await newReview.save();
    await listing.save(); 
    req.flash("success", "New  Review   Created!");
    res.redirect(`/listings/${listing._id}`);
     })
   );
   
     // Delete Review Route 
     router.delete
     ("/:reviewId", 
     wrapAsync(async (req, res) => {
       let { id, reviewId  } = req.params;
   
       await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     await Review.findByIdAndDelete(reviewId);
     req.flash("success", "New Review Delete!");
     res.redirect(`/listings/${id}`);
     })
     );
   
     module.exports = Review;