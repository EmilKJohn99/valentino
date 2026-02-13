const router = require("express").Router();
const { getMovie, markSeen } = require("../controllers/movieController");

router.get("/", getMovie);
router.post("/seen", markSeen);

module.exports = router;
