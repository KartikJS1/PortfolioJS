const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  avatarUrl: String,
  contact: {
    email: String,
    linkedin: String,
    github: String,
  },
});
module.exports = mongoose.model("Profile", ProfileSchema);
