const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const { route } = require("./listing.js");

//signup page
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signupWeb));

//login page
router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginWeb
  );

//logout page
router.get("/logout", userController.logoutWeb);

module.exports = router;
