import express from "express";
import { router as userRouter } from "./Routes/userRoutes.js";
import { router as adminRouter } from "./Routes/adminRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", userRouter);

// Admin Routes
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`));
