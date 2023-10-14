import { Router } from "express";
import { getImg, deleteImgById, createImg, getImgById } from "../controller/imgController.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = Router();

router.get("/", getImg);
router.get("/:id", getImgById)
router.post("/", [verifyToken], createImg)
router.delete("/:id", [verifyToken], deleteImgById)


export default router;
