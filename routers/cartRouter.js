const router = require("express").Router();
const cartCtrl = require("../controllers/cartCtrl");
const auth = require("../middlewares/auth")

router.route("/carts").post(auth ,cartCtrl.createNewCart).put(auth ,cartCtrl.updateCart);

router.put("/cart/increase", auth , cartCtrl.increaseCartItem);

router.put("/cart/decrease", auth , cartCtrl.decreaseCartItem);

router.get("/userCart", cartCtrl.getUserCart);

router.delete("/carts", auth, cartCtrl.deleteCart);

module.exports = router;
