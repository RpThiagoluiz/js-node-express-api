const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`❤️  Server on in http://localhost:${PORT}`));
