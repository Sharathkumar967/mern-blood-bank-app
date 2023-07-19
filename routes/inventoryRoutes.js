const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryContoller,
  getInventoryController,
} = require("../controllers/inventroryController");

const router = express.Router();

// routes

// Add inventory

router.post("/create-inventory", authMiddleware, createInventoryContoller);

router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
