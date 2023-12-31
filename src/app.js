import express from 'express'
import cors from 'cors'

const app = express();

//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes

import indexRouter from "./route/index.js"
import authRouter from "./route/auth.js"
import publicationsRouter from "./route/publication.js"
import skillRouter from "./route/skillRouter.js"
import imgRouter from "./route/imgRouter.js"


app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/publications", publicationsRouter);
app.use("/api/skill", skillRouter);
app.use("/api/img", imgRouter);


app.use(express.json());

app.use(
  cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
  })
);


export default app;
