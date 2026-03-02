import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT || 3977;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Local Adventures API",
    version: "1.0.0",
    description: "Documentación de la API",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);