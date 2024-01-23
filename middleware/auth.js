const jwt = require("jsonwebtoken");

function checkJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: Token not available" });
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.Secret_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      } else {
        console.log("JWT decoded:", decoded);
        req.userEmail = decoded.email;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = checkJWT