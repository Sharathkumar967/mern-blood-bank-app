const express = require("express");
const { testController } = require("../controllers/testController");

const router = express();

router.get("/", testController);

module.exports = router;
