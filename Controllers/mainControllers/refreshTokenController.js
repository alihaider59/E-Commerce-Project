const jwt = require("jsonwebtoken");
const UserLogins = require("../../Models/userLogins");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }

  try {
    const user = await UserLogins.findOne({ refreshToken });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const payload = {
      email: decoded.email,
      profileId: decoded.profileId,
    };

    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

// Exports Functions
module.exports = {
  refreshToken,
};
