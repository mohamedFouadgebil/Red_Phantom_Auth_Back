import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env.dev" });

import express from "express";
import { initApp } from "./src/app.controller.js";

const app = express();
initApp(app);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`🔥 Red Phantom running on port ${PORT}`);
});
