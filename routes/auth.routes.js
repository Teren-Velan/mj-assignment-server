const express = require("express");
const router = express.Router();
const { signin, signinWithToken } = require("../controllers/auth");
const Auth = require("../middleware/auth.middleware");

router.post("/signin", signin);
router.get("/", Auth, signinWithToken);
// router.post("/signup", signup);

module.exports = router;
