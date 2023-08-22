const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryContoller,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganizationController,
} = require("../controllers/inventroryController");

const router = express.Router();

// routes

// Add inventory || post
router.post("/create-inventory", authMiddleware, createInventoryContoller);

// Get All Blood Records
router.get("/get-inventory", authMiddleware, getInventoryController);

// get Donar records
router.get("/get-donars", authMiddleware, getDonarsController);

// get Hospitals records
router.get("/get-hospitals", authMiddleware, getHospitalsController);

// get Organization records
router.get("/get-organization", authMiddleware, getOrganizationController);

module.exports = router;
