const checkRole = (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      next();
      return;
    } else {
      res.status(409).send("You're not admin!!!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkRole;