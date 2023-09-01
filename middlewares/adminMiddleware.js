const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    console.log("Received userId:", req.body.userId);
    const user = await userModel.findById(req.body.userId);

    console.log("Retrieved user:", user?.user);

    // check Admin
    if (!user?.user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    if (user?.user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Only admins allowed",
      });
    }

    next();
  } catch (err) {
    console.error("Error in adminMiddleware:", err);
    return res.status(500).send({
      success: false,
      message: "Auth Failed, Admin Api",
      err,
    });
  }
};
