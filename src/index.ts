import databaseConnection from "./database/databaseConnection.js";
import environment from "./loadEnvironment.js";
import app from "./server/app.js";
import startServer from "./server/index.js";

const { port, mongoDbUrl } = environment;

await startServer(app, Number(port));
await databaseConnection(mongoDbUrl);
