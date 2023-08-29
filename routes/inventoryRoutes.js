const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryContoller,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventroryController");

const router = express.Router();

// routes

// Add inventory || post
router.post("/create-inventory", authMiddleware, createInventoryContoller);

// Get All Blood Records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Get recent Blood Records
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// Get hospital Blood Records
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// get Donar records
router.get("/get-donars", authMiddleware, getDonarsController);

// get Hospitals records
router.get("/get-hospitals", authMiddleware, getHospitalsController);

// get Organization records
router.get("/get-organization", authMiddleware, getOrganizationController);

// get Organization records
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationForHospitalController
);

module.exports = router;
