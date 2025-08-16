const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");
const BannerController = require("../controller/client/BannerController");
const BannerImageUpload = require("../helper/BannerImageUpload");
const multer = require("multer");
const upload = multer();

router.get("/", AdminController.DashboardPage);
router.get("/banner", AdminController.BannerListPage);

// Banner Routes
router.post(
  "/add-banner",
  BannerImageUpload.fields([
    {
      name: "primaryImage",
      maxCount: 1,
    },
    {
      name: "secondaryImage",
      maxCount: 1,
    },
  ]),
  BannerController.createBanner
);
router.get("/list-banner", BannerController.listBanner)
router.delete('/delete-banner/:id', BannerController.deleteBanner)

module.exports = router;
