import { default as debug, default as debugCreator } from "debug";
import type { Express } from "express";

const debugInfo = debugCreator("somoscomercio:users:server");

const startServer = async (app: Express, port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debugInfo(`Listening on port ${port}`);
      resolve(server);
    });

    server.on("error", (error: Error) => {
      debug(`There was an error in server ${error.message}`);
      reject(error);
    });
  });

export default startServer;
