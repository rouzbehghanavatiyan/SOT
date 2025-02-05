console.clear();
import express from "express";
import bodyParser from "body-parser";
import { ServiceBroker } from "moleculer";
import swaggerUi from "swagger-ui-express";
import getAllRouter from "./Presentation/routes";
import swaggerDocs from "./Presentation/swagger/swaggerSetup";
const app = express();
const broker = new ServiceBroker();
const router = getAllRouter();

app.use(bodyParser.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

const start = (): void => {
  app.listen(4004, () => {
    console.log(`Server is running on port 4004`);
  });
};
broker.start().then(() => {
  console.log("Moleculer broker started");
  start();
});
