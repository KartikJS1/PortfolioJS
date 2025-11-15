const mongoose = require("mongoose");
const SkillSchema = new mongoose.Schema({
  name: String,
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Intermediate",
  },
  sortOrder: Number,
});
module.exports = mongoose.model("Skill", SkillSchema);
