// cats.route.ts 

import { Cat, CatType } from './cats.model';
import { Router } from 'express';

const router = Router();

/** READ: 전체 고양이 데이터 조회 */
router.get('/cats', (req, res) => {
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
router.get('/cats/:id', (req, res) => {
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
router.post('/cats', (req, res) => {
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

export default router;
