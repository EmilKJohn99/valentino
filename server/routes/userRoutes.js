const router = require("express").Router();
const { acceptValentine } = require("../controllers/userController");

router.post("/accept", acceptValentine);

module.exports = router;
