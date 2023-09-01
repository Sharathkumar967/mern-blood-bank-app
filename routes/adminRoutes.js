const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router object
const router = express.Router();

// routes

// get || donar List
router.get("/donar-list", adminMiddleware, getDonarsListController);

// get || hospital List
router.get("/hospital-list", adminMiddleware);
getHospitalListController;

// get || Orf List
router.get("/org-list", adminMiddleware);
getOrgListController;

/// Delete donar
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

// export
module.exports = router;
