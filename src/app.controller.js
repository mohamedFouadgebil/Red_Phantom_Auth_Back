import express from "express";
import cors from "cors";
import { connectDB } from "./DB/connections.js";
import userRouter from "./Modulus/User/user.controller.js";
import { globalError } from "./Middleware/error.middleware.js";

export const initApp = (app) => {
  app.use(cors());
  app.use(express.json());

  connectDB();

  app.use("/api/users", userRouter);
  
  app.get("/", (req, res) => {
    res.json({
        message: "Red Phantom API is running 🚀"
    });
    });


  app.use("/*dummy", (req, res) =>
    res.status(404).json({ message: "Route not found" }),
  );

  app.use(globalError);
};
