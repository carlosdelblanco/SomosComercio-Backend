import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endpointError, generalError } from "./middlewares/errors/errors.js";
import usersRouters from "./routes/usersRouters.js";

const app = express();
app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouters);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Somos Comercio",
  });
});

app.use(generalError);
app.use(endpointError);

export default app;
