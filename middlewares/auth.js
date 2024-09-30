const jwt = require("jsonwebtoken");

const ensureAuthentication = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "token required*",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        msg: "invalid token",
      });
    }
    return next();

  } catch (error) {
    return res.status(500).json({
      status: 0,
      msg: "something went wrong",
    });
  }
};

module.exports = ensureAuthentication;