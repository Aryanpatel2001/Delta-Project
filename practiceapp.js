const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
// const Listing = require("./models/listing.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

//setup mongodb conection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust1";
main()
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.set("view engine", " ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("well woking");
});

// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// app.use("/listings", listings);

//Index Route
// app.get(
//   "/listings",
//   wrapAsync(async (req, res) => {
//     const alllistings = await Listing.find({});
//     res.render("./listings/index.ejs", { alllistings });
//   })
// );

//new Route
// app.get("/listings/new", (req, res) => {
//   res.render("./listings/new.ejs");
// });

//show route
// app.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("./listings/show.ejs", { listing });
//   })
// );

//create Route
// app.post(
//   "/listings",
//   validateListing,
//   wrapAsync(async (req, res, next) => {
//     let newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );

//edit route
// app.get(
//   "/listings/:id/edit",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
//   })
// );

//update route
// app.put(
//   "/listings/:id",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
//   })
// );

//delete route
// app.delete(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
//   })
// );

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//Reviews
//post route
// app.post(
//   "/listings/:id/reviews",
//   validateReview,
//   wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`);
//   })
// );

//Delete Review Route
// app.delete(
//   "/listings/:id/reviews/:reviewId",
//   wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
//   })
// );

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log("sever islistening to port 8080");
});
