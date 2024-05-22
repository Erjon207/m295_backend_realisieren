const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Family Tasks API',
    description: 'Login Required'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./tasks.js'];

swaggerAutogen(outputFile, routes, doc);