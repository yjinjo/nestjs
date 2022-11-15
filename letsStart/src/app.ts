// app.ts

import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();

// 미들웨어는 use 메서드를 사용한다.
// next는 다음 라우터로 이동할 수 있는 함수이다. 
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  // 다음 라우터로 실행되게 하려면 next 함수를 호출해야한다. 
  next();
})

app.get("/cats/som", (req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is som middleware");
  // 다음 라우터로 실행되게 하려면 next 함수를 호출해야한다. 
  next();
})

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
})

app.get("/cats/blue", (req, res) => {
  res.send({ blue: Cat[0] })
})

app.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] })
})

app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
})

// 서버를 열어준다.
app.listen(8000, () => {
  console.log('server is on...');
})
