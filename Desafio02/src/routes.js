import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store); // Funcionando
routes.post('/sessions', SessionController.store); // Funcionando

// routes.use(authMiddleware);

routes.post('/students', StudentController.store); // Funcionando
routes.put('/students/:id', StudentController.update); // Funcionando
routes.put('/user', UserController.update); // testar

export default routes;
