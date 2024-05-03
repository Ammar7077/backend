import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const tokenType = req.headers.authorization.split(" ")[0];
    if (tokenType !== "Bearer") {
      return res.status(401).json({ error: "Token must be Bearer" });
    }

    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: "authorization required" });
  }
};
export default auth;
