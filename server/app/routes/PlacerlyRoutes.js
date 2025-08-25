const express = require("express");
const router = express.Router();
const UserController = require("../controller/placerly/UserController");
const AssetsController = require("../controller/placerly/AssetsController");
const DebtController = require("../controller/placerly/DebtController");
const InsuranceController = require("../controller/placerly/InsuranceController");
const UtilityController = require("../controller/placerly/UtilityController");
const TransitionController = require("../controller/placerly/TransitionController")
const { AuthCheck } = require("../middleware/Auth");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/verify-email", UserController.verifyEmail);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile", AuthCheck, UserController.userProfileDetails);

//Assets
router.post("/create-asset", AuthCheck, AssetsController.createAsset);
router.get("/get-all-asset", AuthCheck, AssetsController.getUserAssets);
router.get("/asset-details/:id", AuthCheck, AssetsController.getAssetById);
router.put("/asset-update/:id", AuthCheck, AssetsController.updateAsset);
router.delete("/delete-asset/:id", AuthCheck, AssetsController.deleteAsset);

//Debts
router.post("/create-debt", AuthCheck, DebtController.createDebt);
router.get("/get-all-debt", AuthCheck, DebtController.getUserDebts);
router.get("/debt-details/:id", AuthCheck, DebtController.getDebtById);
router.put("/debt-update/:id", AuthCheck, DebtController.updateDebt);
router.delete("/delete-debt/:id", AuthCheck, DebtController.deleteDebt);

//Insurance
router.post("/create-insurance", AuthCheck, InsuranceController.createInsurance);
router.get("/get-all-insurance", AuthCheck, InsuranceController.getUserInsurances);
router.get("/insurance-details/:id", AuthCheck, InsuranceController.getInsuranceById);
router.put("/insurance-update/:id", AuthCheck, InsuranceController.updateInsurance);
router.delete("/delete-insurance/:id", AuthCheck, InsuranceController.deleteInsurance);

//Utility
router.post("/create-utility", AuthCheck, UtilityController.createUtility);
router.get("/get-all-utility", AuthCheck, UtilityController.getUserUtilities);
router.get("/utility-details/:id", AuthCheck, UtilityController.getUtilityById);
router.put("/utility-update/:id", AuthCheck, UtilityController.updateUtility);
router.delete("/delete-utility/:id", AuthCheck, UtilityController.deleteUtility);

//Transition
router.post("/create-transition", AuthCheck, TransitionController.createTransition);       
router.get("/get-all-transition", AuthCheck, TransitionController.getUserTransitions);       
router.get("/transition-details/:id", AuthCheck, TransitionController.getTransitionById);     
router.put("/transition-update/:id", AuthCheck, TransitionController.updateTransition);     
router.delete("/delete-transition/:id", AuthCheck, TransitionController.deleteTransition);    

module.exports = router;
