const express = require("express");
const router = express.Router();
const { signin, signinWithToken } = require("../controllers/auth");
const Auth = require("../middleware/auth.middleware");
const cors = require("../utils/cors");

router
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post("/signin", signin);
router.get("/", Auth, signinWithToken);
// router.post("/signup", signup);

module.exports = router;
