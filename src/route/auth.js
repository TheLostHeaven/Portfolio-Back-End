import { Router } from "express";
import { signinHandler} from "../controller/auth.js";


const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//Loguearse
router.post("/signin", signinHandler);


export default router;
