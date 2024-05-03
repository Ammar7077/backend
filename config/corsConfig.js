import cors from "cors";
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
