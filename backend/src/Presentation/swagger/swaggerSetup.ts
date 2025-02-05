import swaggerJsDoc from "swagger-jsdoc";
import swaggerDefinition from "./swaggerDefinition";

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/Presentation/controller/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
