const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");

    const user = await User.findOne({ token: token }).select("-hash -salt");
    // console.log(user);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
