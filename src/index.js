const express = require('express');
require('express-async-errors');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`❤️  Server on in http://localhost:${PORT}`));
