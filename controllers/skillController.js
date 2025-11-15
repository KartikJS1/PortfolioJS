const Skill = require("../models/Skill");

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
