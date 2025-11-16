const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET list
router.get("/", async (req, res) => {
  const items = await Project.find().sort({ createdAt: -1 });
  console.log(items);
  res.json(items);
});

// POST create with image upload (protected)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || "";

    // Convert Cloudinary upload_stream into Promise
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const proj = new Project({
      title: req.body.title,
      description: req.body.description,
      imageUrl,
      link: req.body.link,
      tags: req.body.tags ? req.body.tags.split(",").map((t) => t.trim()) : [],
    });

    await proj.save();
    res.json(proj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

// PUT /:id and DELETE similarly (protected)
router.put("/:id", auth, async (req, res) => {
  const upd = req.body;
  const project = await Project.findByIdAndUpdate(req.params.id, upd, {
    new: true,
  });
  res.json(project);
});

router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "deleted" });
});

module.exports = router;
