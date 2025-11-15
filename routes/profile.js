const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");

// Create or update profile
router.post("/", auth, async (req, res) => {
  try {
    const { name, bio, location, profileImage } = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({
        name,
        bio,
        location,
        profileImage,
      });
    } else {
      profile.name = name;
      profile.bio = bio;
      profile.location = location;
      profile.profileImage = profileImage;
    }

    await profile.save();
    res.json({ message: "Profile saved", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
