import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/chat", chatRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ JavaMaster backend running on http://localhost:${PORT}`);
});
