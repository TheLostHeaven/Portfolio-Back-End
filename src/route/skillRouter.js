import { Router } from "express";
import { createSkill, getSkill, deleteSkillById } from "../controller/skillController.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = Router();

router.get("/", getSkill)
router.post("/", [verifyToken], createSkill);
router.delete ("/:id", [verifyToken], deleteSkillById)


export default router;
