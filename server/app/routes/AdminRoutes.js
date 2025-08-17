const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");
const BannerController = require("../controller/client/BannerController");
const BannerImageUpload = require("../helper/BannerImageUpload");
const AboutImageUpload = require("../helper/AboutImageUpload")
const ServiceImageUpload = require("../helper/ServiceImageUpload");
const TestimonialImageUpload = require("../helper/TestimonialImageUpload")
const multer = require("multer");
const AboutController = require("../controller/client/AboutController");
const ServiceController = require("../controller/client/ServiceController");
const TestimonialController = require("../controller/client/TestimonialController");
const upload = multer();

router.get("/", AdminController.DashboardPage);

// Banner Routes
router.get("/banner", AdminController.BannerListPage);
router.post("/add-banner",BannerImageUpload.fields([{name: "primaryImage",maxCount: 1,},{name: "secondaryImage",maxCount: 1,}]),BannerController.createBanner);
router.get("/list-banner", BannerController.listBanner)
router.get("/banner-details/:id",BannerController.bannerDetails)
router.patch("/banner-update/:id", BannerImageUpload.fields([{name: "primaryImage",maxCount: 1,},{name: "secondaryImage",maxCount: 1,}]), BannerController.updateBanner)
router.delete('/delete-banner/:id', BannerController.deleteBanner)

//About Routes
router.get("/about", AdminController.AboutListPage)
router.post("/add-about",AboutImageUpload.single('image'), AboutController.createAbout)
router.get("/list-about", AboutController.listAbout)
router.get("/about-details/:id", AboutController.aboutDetails)
router.patch("/about-update/:id",AboutImageUpload.single("image"), AboutController.updateAbout)
router.delete("/delete-about/:id", AboutController.deleteAbout)

//Service Routes
router.get("/service", AdminController.ServiceListPage)
router.post("/add-service",ServiceImageUpload.single('image'), ServiceController.createService)
router.get("/list-service", ServiceController.listService)
router.get("/service-details/:id", ServiceController.serviceDetails)
router.patch("/service-update/:id",ServiceImageUpload.single("image"), ServiceController.updateService)
router.delete("/delete-service/:id", ServiceController.deleteService)

//Testimonial Routes
router.get("/testimonial", AdminController.TestimonialListPage)
router.post("/add-testimonial", TestimonialImageUpload.single("image"),TestimonialController.createTestimonial)
router.get("/list-testimonial", TestimonialController.listTestimonial)
router.get("/testimonial-details/:id", TestimonialController.testimonialDetails)
router.patch("/testimonial-update/:id",TestimonialImageUpload.single("image"),TestimonialController.updateTestimonial)
router.delete("/delete-testimonial/:id", TestimonialController.deleteTestimonial)

module.exports = router;
