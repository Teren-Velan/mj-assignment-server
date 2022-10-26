const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  fetchAllProducts,
} = require("../controllers/product");

const Auth = require("../middleware/auth.middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", Auth, fetchAllProducts);
router.post("/create", Auth, upload.single("image"), create);
router.put("/update/:id", Auth, upload.single("image"), update);
router.delete("/delete/:id", Auth, remove);

module.exports = router;
