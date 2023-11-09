import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/mydb.js";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/userRoutes.js";
import { router } from "./routes/expenseRoutes.js";
import path, { dirname } from "path";
import cors from "cors";

// Configuring the environment variables
dotenv.config();
connectToMongoDB();


// Rest object
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

// Transactions routes
app.use("/api/v1/transactions", router);
app.use("/api/v1/user", userRouter);
// Static files
app.use(express.static(path.join(__dirname, "front", "dist")));

// Port
const PORT = 7000;

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
