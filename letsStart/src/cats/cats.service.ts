// cats.service.ts 

import { Request, Response } from "express";
import { Cat, CatType } from './cats.model';

/** READ: 전체 고양이 데이터 조회 */
export const readAllcat = (req: Request, res: Response) => {
  try {
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
};

/** READ: 특정 고양이 데이터 조회 */
export const readCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
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
};

/** CREATE: 새로운 고양이 추가 API */
export const createCat = (req: Request, res: Response) => {
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
};

/** UPDATE: 고양이 데이터 전체 업데이트 --> PUT */
export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    // 업데이트 할 내용이 body에 실려서 오기 때문에, body를 하나 만든다. 
    const body = req.body;
    let result;

    // 기존의 DB에서 DB를 순회하면서,
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        // 만약 id가 동일하다면 새롭게 바뀌는 데이터를 cat에 덮어씌운다. 
        cat = body;
        result = cat;
      }
    })
    res.status(200).send({
      success: true,
      data: {
        cat: result
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
};

/** UPDATE: 고양이 데이터 부분적으로 업데이트 --> PATCH */
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body }
        result = cat;
      }
    })
    res.status(200).send({
      success: true,
      data: {
        cat: result
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
};

/** DELETE: 고양이 데이터 삭제 --> DELETE */
export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);

    res.status(200).send({
      success: true,
      data: newCat
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
};
