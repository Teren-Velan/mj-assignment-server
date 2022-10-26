const express = require("express");

const router = express.Router();
const {
  create,
  update,
  remove,
  fetchAllProducts,
} = require("../controllers/product");

const upload = require("../utils/multer");

const Auth = require("../middleware/auth.middleware");

router.get("/", Auth, fetchAllProducts);
router.post("/create", Auth, upload.single("image"), create);
router.put("/update/:id", Auth, upload.single("image"), update);
router.delete("/delete/:id", Auth, remove);

module.exports = router;
