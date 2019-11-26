import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);

routes.post('/students', StudentController.store); // Funcionando
routes.put('/students', StudentController.update); //
routes.put('/user', UserController.update);

export default routes;
