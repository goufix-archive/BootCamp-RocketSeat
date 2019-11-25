import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.use(authMiddleware);

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);

export default routes;
