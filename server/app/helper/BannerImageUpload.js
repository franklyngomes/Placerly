const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banners");
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "primaryImage") {
      cb(null, file.fieldname + "-" + Date.now());
    } else if (file.fieldname === "secondaryImage") {
      cb(null, file.fieldname + "-" + Date.now());
    }
  },
});

const BannerImageUpload = multer({ storage: storage });
module.exports = BannerImageUpload;
