// app.ts

import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });  // key: value
})


// 서버를 열어준다.
app.listen(8000, () => {
  console.log('server is on...');
})