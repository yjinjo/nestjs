// app.ts

import * as express from "express";

const app: express.Express = express();
const port: number = 8000;

app.get('/', (req, res) => {
  res.send("Hello, world!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
