import { Router } from "express";
import { createUser, confirmEmail, loginUser } from "./user.services.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "Signup successful", user });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/verify-email", async (req, res) => {
  try {
    await confirmEmail(req.body);
    res.json({ message: "Email verified" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
