import { Router } from 'express';

import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;
