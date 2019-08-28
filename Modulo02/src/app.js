import express from 'express';
// eslint-disable-next-line no-unused-vars
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(__dirname, '..', 'tmp', 'uploads')
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
