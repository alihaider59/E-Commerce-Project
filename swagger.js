const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for E-Commerce project",
    },
    servers: [
      {
        url: "http://localhost:8000/api/ecommerce",
      },
    ],
  },
  apis: ["./Routes/mainRoutes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
