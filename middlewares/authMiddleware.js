const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Auth Failed: Invalid token",
      });
    } 

    const token = authHeader.split(" ")[1].trim();

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed: Invalid token",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: "Auth Failed",
      error: err.message,
    });
  }
};
