const router = require("express").Router();
const ratingCtrl = require("../controllers/ratingCtrl");
const auth = require("../middlewares/auth");
router
  .route("/rating")
  .post(auth, ratingCtrl.createNewRating)
  .patch(auth, ratingCtrl.updateRating)
  .delete(auth, ratingCtrl.deleteRating);

router.patch("/rating/like", auth,  ratingCtrl.likeRating);

router.patch("/rating/unlike", auth, ratingCtrl.unLikeRating);

module.exports = router;
