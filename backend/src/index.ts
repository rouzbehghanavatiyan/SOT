console.clear();
import express from "express";
import bodyParser from "body-parser";
import { ServiceBroker } from "moleculer";
import swaggerUi from "swagger-ui-express";
import getAllRouter from "./Presentation/routes";
import http from "http";
import swaggerDocs from "./Presentation/swagger/swaggerSetup";
import socketController from "./Presentation/controller/socketController";

const app = express();
const server = http.createServer(app);
socketController(server);
const broker = new ServiceBroker();
const router = getAllRouter();

app.use(bodyParser.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

const start = (): void => {
  server.listen(4004, () => console.log("server is running:", 4004));
};

broker.start().then(() => {
  console.log("Moleculer broker started");
  start();
});
