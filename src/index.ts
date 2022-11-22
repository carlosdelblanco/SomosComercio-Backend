import "./loadEnvironment.js";
import environment from "./loadEnvironment.js";
import app from "./server/app.js";
import startServer from "./server/index.js";

const { port } = environment;

await startServer(app, Number(port));
