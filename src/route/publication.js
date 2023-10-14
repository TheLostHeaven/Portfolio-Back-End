import { Router } from "express";
import { getPublication, createPublication, deletePublicationById, updatePublicationById} from "../controller/publication.js";
import { verifyToken } from "../middleware/authJwt.js"

const router = Router();

router.get("/", getPublication);
router.post("/", [verifyToken], createPublication);
router.patch("/:id", [verifyToken], updatePublicationById);
router.delete("/:id", [verifyToken], deletePublicationById);

export default router;

