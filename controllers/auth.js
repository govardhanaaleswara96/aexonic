const jwt = require("jsonwebtoken");
// verifyToken
const verifyToken = async (req, res, next) => {
  //console.log(req.headers);
  const bearerHeader = req.headers["authorization"];
  // console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    await jwt.verify(req.token, "h4d5fe5", (err, authData) => {
      if (err) {
        res.status(404).json({
          message: "Token NotMatched",
        });
      } else {
        //console.log(authData.user);
        next();
      }
    });
    // next();
  } else {
    res.status(404).json({
      message: "Token Undefined",
    });
  }
};

module.exports = { verifyToken };
