const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(express.json());
app.use(middlewares);
app.use('/api', router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ JSON Server is running on port ${port}`);
});
