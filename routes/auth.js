const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ msg: "password required" });
  if (password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ msg: "wrong" });
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

module.exports = router;
