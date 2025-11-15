const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createSkill,
  getSkills,
  deleteSkill,
} = require("../controllers/skillController");

router.get("/", getSkills);
router.post("/", auth, createSkill);
router.delete("/:id", auth, deleteSkill);

module.exports = router;
