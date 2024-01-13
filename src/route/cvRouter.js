import { Router } from "express";
import { createCV, getCV, deleteCVById } from "../controller/cvFile.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = Router();

router.get("/", getCV);
router.post("/", [verifyToken], createCV);
router.delete("/:id", [verifyToken], deleteCVById);

export default router;


