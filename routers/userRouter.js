const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");

router
  .route("/user")
  .get(auth ,userCtrl.getUser)
  .delete(auth ,userCtrl.deleteUser)
  .patch(auth, userCtrl.updateUser);

router.get("/allUsers",auth , userCtrl.getAllUsers);

router.get("/search",auth,  userCtrl.searchUser);

router.get("/userStats",auth,  userCtrl.getUsersStats);

router.patch("/updateUserFromAdmin",auth , userCtrl.updateUserFromAdmin);

router.patch("/updatePasswordFromAdmin", auth, userCtrl.updatePasswordFromAdmin);

router.patch("/favourite", userCtrl.addFavourite);

router.patch("/removeFavourite", userCtrl.removeFavourite);

router.patch("/changePassword", auth,  userCtrl.changePassword);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/resetPassword", userCtrl.resetPassword);

module.exports = router;
