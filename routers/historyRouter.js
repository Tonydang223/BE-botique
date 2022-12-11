const router = require("express").Router();
const historyCtrl = require("../controllers/historyCtrl");
const auth = require("../middlewares/auth")
router
  .route("/histories")
  .get(historyCtrl.getAllHistories)
  .post(auth, historyCtrl.createNewHistory);

router
  .route("/history")
  .patch(auth, historyCtrl.updateHistory)
  .delete(auth, historyCtrl.deleteHistory);

router.get("/monthlyIncome", historyCtrl.getMonthlyIcomes);

router.get("/userHistory", auth, historyCtrl.getUserHistories);

module.exports = router;
