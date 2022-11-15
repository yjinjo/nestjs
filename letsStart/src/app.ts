// app.ts

import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();

/** logging middleware */
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

/** JSON middleware */
app.use(express.json());

/** READ: 전체 고양이 데이터 조회 */
app.get('/cats', (req, res) => {
  try {
    // DB에서 Cat을 가져옴 
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

/** READ: 특정 고양이 데이터 조회 */
app.get('/cats/:id', (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    // DB에서 Cat을 가져옴 
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    })
    res.status(200).send({
      success: true,
      data: {
        cat,
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

/** CREATE: 새로운 고양이 추가 API */
app.post('/cats', (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // DB에 저장
    Cat.push(data);  // create 
    res.status(200).send({
      success: true,
      // data가 성공적으로 저장이되면 우리가 만든 data를 client에게 보여줌 (선택)
      data: { data }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

/** 404 middleware */
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

// 서버를 열어준다.
app.listen(8000, () => {
  console.log('server is on...');
});
