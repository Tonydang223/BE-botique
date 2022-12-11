const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middlewares/auth");

router
  .route("/products")
  .get(productCtrl.getAllProducts)
  .post(auth ,productCtrl.createNewProduct);

router.post("/productByCategory", productCtrl.getProductsByCategories);

router.get("/pagination", productCtrl.getProductPagination);

router.get("/relatedProducts", productCtrl.getProductRelated);

router
  .route("/product")
  .get(productCtrl.getProduct)
  .patch(auth ,productCtrl.updateProduct)
  .delete(auth , productCtrl.deleteProduct);

module.exports = router;
