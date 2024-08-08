import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scissor URL-Shortening API',
      version: '1.0.0',
      description: 'API documentation for the Scissor URL-Shortening project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
