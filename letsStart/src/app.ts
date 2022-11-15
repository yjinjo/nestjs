// app.ts

import * as express from 'express';
import catsRouter from "./cats/cats.route";


class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    /** logging middleware */
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next();
    });

    /** JSON middleware */
    this.app.use(express.json());

    this.setRoute();

    /** 404 middleware */
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404 not found error" });
    });
  }

  public listen() {
    // listen에서는 미들웨어를 전부 세팅해줘야한다.
    this.setMiddleware();

    this.app.listen(8000, () => {
      console.log('server is on...');
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
