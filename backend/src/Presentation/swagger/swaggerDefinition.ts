const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API Documentation",
  },
  servers: [
    {
      url: "http://localhost:4004",
    },
  ],
  tags: [
    {
      name: "Category",
      description: "Category management",
    },
  ],
  paths: {
    "/category/categoryPost": {
      get: {
        summary: "Get category test data",
        description: "Returns a simple message",
        tags: ["Category"],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Hello world",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
