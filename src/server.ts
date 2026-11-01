import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;
import "./modules";
import { Sequelize } from "sequelize";
import userRoutes from "./modules/user/routes/user.routes";
import meetingRoutes from "./modules/meeting/routes/meeting.routes";
const app: Application = express();
import sequelize from "./config/database";
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

// Test API
app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Meeting Scheduler API is running"
    });
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();

export default app;