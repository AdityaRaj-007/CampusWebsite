import express from "express";
import { router as userRouter } from "./Routes/userRoutes.js";
import { router as adminRouter } from "./Routes/adminRoutes.js";
import { connectDB } from "./utils/dbConnection.js";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

//Password - cX2GOcK8vUxTjNlM
//user - iamadityaraj2001_db_user
//mongodb+srv://iamadityaraj2001_db_user:cX2GOcK8vUxTjNlM@cluster0.uug9vru.mongodb.net/?appName=Cluster0

connectDB();

app.use("/api", userRouter);

// Admin Routes
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`));
