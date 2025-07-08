const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/images/others"; // default folder

    // Set folder based on fieldname (e.g., 'images', 'icon')
    if (file.fieldname === "images") {
      folder = "public/images/products";
    } else if (file.fieldname === "icon") {
      folder = "public/images/categories";
    }

    // Create folder if it doesn't exist
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
