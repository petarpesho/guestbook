const express = require('express');
const bodyParser = require('body-parser');
const constants = require('./constants');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(bodyParser.json());

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.use('/', require('./Routes/'));

//catch unhandled errors
process.on('unhandledRejection', (error) => {
  console.log(error.message);
});

app.listen(constants.PORT, () => {
  console.log(`Listening on port ${constants.PORT}`);
})