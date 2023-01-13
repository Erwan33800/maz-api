const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({ message: options.message });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
