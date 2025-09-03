const express = require("express");
const router = express.Router();
const PageController = require("../controller/PageController");
const BannerController = require("../controller/client/BannerController");
const BannerImageUpload = require("../helper/BannerImageUpload");
const AboutImageUpload = require("../helper/AboutImageUpload")
const ServiceImageUpload = require("../helper/ServiceImageUpload");
const TestimonialImageUpload = require("../helper/TestimonialImageUpload")
const multer = require("multer");
const AboutController = require("../controller/client/AboutController");
const ServiceController = require("../controller/client/ServiceController");
const TestimonialController = require("../controller/client/TestimonialController");
const PricingController = require("../controller/client/PricingController")
const FaqController = require("../controller/client/FaQController");
const { AuthCheck, redirect } = require("../middleware/Auth");
const upload = multer();

router.get("/",redirect, AuthCheck, PageController.DashboardPage);

// Banner Routes
router.get("/banner",AuthCheck, PageController.BannerListPage);
router.post("/add-banner",AuthCheck,BannerImageUpload.fields([{name: "primaryImage",maxCount: 1,},{name: "secondaryImage",maxCount: 1,}]),BannerController.createBanner);
router.get("/list-banner",AuthCheck, BannerController.listBanner)
router.get("/list-active-banner", BannerController.listActiveBanner)
router.get("/banner-details/:id",AuthCheck,BannerController.bannerDetails)
router.patch("/banner-update/:id",AuthCheck, BannerImageUpload.fields([{name: "primaryImage",maxCount: 1,},{name: "secondaryImage",maxCount: 1,}]), BannerController.updateBanner)
router.delete('/delete-banner/:id',AuthCheck, BannerController.deleteBanner)

//About Routes
router.get("/about",AuthCheck, PageController.AboutListPage)
router.post("/add-about",AuthCheck,AboutImageUpload.single('image'), AboutController.createAbout)
router.get("/list-about",AuthCheck, AboutController.listAbout)
router.get("/list-active-about", AboutController.listActiveAbout)
router.get("/about-details/:id",AuthCheck, AboutController.aboutDetails)
router.patch("/about-update/:id",AuthCheck,AboutImageUpload.single("image"), AboutController.updateAbout)
router.delete("/delete-about/:id",AuthCheck, AboutController.deleteAbout)

//Service Routes
router.get("/service",AuthCheck, PageController.ServiceListPage)
router.post("/add-service",AuthCheck,ServiceImageUpload.single('image'), ServiceController.createService)
router.get("/list-service", ServiceController.listService)
router.get("/service-details/:id",AuthCheck, ServiceController.serviceDetails)
router.patch("/service-update/:id",AuthCheck,ServiceImageUpload.single("image"), ServiceController.updateService)
router.delete("/delete-service/:id",AuthCheck, ServiceController.deleteService)

//Testimonial Routes
router.get("/testimonial",AuthCheck, PageController.TestimonialListPage)
router.post("/add-testimonial",AuthCheck, TestimonialImageUpload.single("image"),TestimonialController.createTestimonial)
router.get("/list-testimonial", TestimonialController.listTestimonial)
router.get("/testimonial-details/:id",AuthCheck, TestimonialController.testimonialDetails)
router.patch("/testimonial-update/:id",AuthCheck,TestimonialImageUpload.single("image"),TestimonialController.updateTestimonial)
router.delete("/delete-testimonial/:id",AuthCheck, TestimonialController.deleteTestimonial)

//Pricing Routes
router.get("/pricing",AuthCheck, PageController.PricingListPage)
router.post("/add-pricing",AuthCheck, upload.none(),PricingController.createPricing)
router.get("/list-pricing", PricingController.listPricing)
router.get("/pricing-details/:id",AuthCheck,PricingController.pricingDetails)
router.patch("/pricing-update/:id",AuthCheck,upload.none(),PricingController.updatePricing)
router.delete("/delete-pricing/:id",AuthCheck, PricingController.deletePricing)

//Faq Routes
router.get("/faq",AuthCheck, PageController.FaqListPage)
router.post("/add-faq",AuthCheck, upload.none(),FaqController.createFaq)
router.get("/list-faq", FaqController.listFaq)
router.get("/faq-details/:id",AuthCheck,FaqController.faqDetails)
router.patch("/faq-update/:id",AuthCheck,upload.none(),FaqController.updateFaq)
router.delete("/delete-faq/:id",AuthCheck, FaqController.deleteFaq)

//Auth Routes
router.get('/signin', PageController.SigninPage)
router.get('/signup', PageController.SignupPage)
router.get('/verify-email', PageController.VerifyEmailPage)
router.get('/forgot-password', PageController.ForgotPasswordPage)
router.get('/reset-password', PageController.ResetPasswordPage)

module.exports = router;
