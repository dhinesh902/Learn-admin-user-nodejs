import express from "express";
import { connection, databaseConnection } from "./connections.js";
import authRouter from "./src/user/routes/auth_routes.js";
import businessRouter from "./src/user/routes/business_routes.js";
import { errorHandler } from "./src/user/middleware/api_response_middleware.js";


const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await databaseConnection();

    await connection.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server ", error);
    process.exit(1);
  }
};

startServer();
