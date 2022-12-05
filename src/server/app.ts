import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endpointError, generalError } from "./middlewares/errors/errors.js";
import businessRouter from "./routers/businessRouters/businessRouter.js";
import usersRouters from "./routers/usersRouters/usersRouters.js";

const app = express();
app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouters);
app.use("/business", businessRouter);

app.use(generalError);
app.use(endpointError);

export default app;
